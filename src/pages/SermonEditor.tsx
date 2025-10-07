import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { saveSermon, updateSermon, getSermon, Sermon, SermonPoint } from '@/lib/sermonsStorage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Printer, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

const emptyPoint: SermonPoint = {
  title: '',
  development: '',
  affirmation: '',
  citation: '',
  references: '',
  catchPhrase: '',
  application: '',
  transition: ''
};

const SermonEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentProfile } = useProfile();
  const [activeTab, setActiveTab] = useState('intro');

  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    textBase: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    preacher: '',
    introduction: '',
    introTransition: '',
    point1: { ...emptyPoint },
    point2: { ...emptyPoint },
    point3: { ...emptyPoint },
    point4: { ...emptyPoint },
    conclusion: '',
    prayer: '',
    appeal: '',
    tags: ''
  });

  useEffect(() => {
    document.title = id ? 'Editar Sermão - Bíblia 365' : 'Novo Sermão - Bíblia 365';
    
    if (id) {
      const sermon = getSermon(id);
      if (sermon) {
        setFormData({
          title: sermon.title,
          theme: sermon.theme,
          textBase: sermon.textBase,
          date: sermon.date,
          preacher: sermon.preacher,
          introduction: sermon.introduction,
          introTransition: sermon.introTransition,
          point1: sermon.point1,
          point2: sermon.point2,
          point3: sermon.point3,
          point4: sermon.point4,
          conclusion: sermon.conclusion,
          prayer: sermon.prayer,
          appeal: sermon.appeal,
          tags: sermon.tags.join(', ')
        });
      }
    }
  }, [id]);

  const handleSave = () => {
    if (!currentProfile) return;
    if (!formData.title || !formData.textBase) {
      toast.error('Preencha título e texto base');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (id) {
      updateSermon(id, {
        title: formData.title,
        theme: formData.theme,
        textBase: formData.textBase,
        date: formData.date,
        preacher: formData.preacher,
        introduction: formData.introduction,
        introTransition: formData.introTransition,
        point1: formData.point1,
        point2: formData.point2,
        point3: formData.point3,
        point4: formData.point4,
        conclusion: formData.conclusion,
        prayer: formData.prayer,
        appeal: formData.appeal,
        tags: tagsArray
      });
      toast.success('Sermão atualizado!');
    } else {
      saveSermon({
        profileId: currentProfile.id,
        title: formData.title,
        theme: formData.theme,
        textBase: formData.textBase,
        date: formData.date,
        preacher: formData.preacher,
        introduction: formData.introduction,
        introTransition: formData.introTransition,
        point1: formData.point1,
        point2: formData.point2,
        point3: formData.point3,
        point4: formData.point4,
        conclusion: formData.conclusion,
        prayer: formData.prayer,
        appeal: formData.appeal,
        tags: tagsArray
      });
      toast.success('Sermão salvo!');
    }

    navigate('/sermons');
  };

  const handlePrint = () => {
    window.print();
  };

  const updatePoint = (pointKey: 'point1' | 'point2' | 'point3' | 'point4', field: keyof SermonPoint, value: string) => {
    setFormData(prev => ({
      ...prev,
      [pointKey]: {
        ...prev[pointKey],
        [field]: value
      }
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-content, .print-content * {
              visibility: visible;
            }
            .print-content {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .no-print {
              display: none !important;
            }
            .print-content {
              font-size: 12pt;
              line-height: 1.6;
            }
            .print-content h1 {
              font-size: 20pt;
              margin-bottom: 10pt;
            }
            .print-content h2 {
              font-size: 16pt;
              margin-top: 15pt;
              margin-bottom: 8pt;
            }
            .print-content h3 {
              font-size: 14pt;
              margin-top: 12pt;
              margin-bottom: 6pt;
            }
          }
        `}
      </style>

      {/* Header - No Print */}
      <div className="no-print mb-8">
        <Button variant="ghost" onClick={() => navigate('/sermons')}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar aos Sermões
        </Button>
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-4xl font-bold">
            {id ? 'Editar Sermão' : 'Novo Sermão'}
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 w-4 h-4" />
              Imprimir
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 w-4 h-4" />
              Salvar
            </Button>
          </div>
        </div>
      </div>

      {/* Print Content */}
      <div className="print-content">
        <Card className="p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="no-print">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="intro">Intro</TabsTrigger>
              <TabsTrigger value="point1">Ponto 1</TabsTrigger>
              <TabsTrigger value="point2">Ponto 2</TabsTrigger>
              <TabsTrigger value="point3">Ponto 3</TabsTrigger>
              <TabsTrigger value="point4">Ponto 4</TabsTrigger>
              <TabsTrigger value="conclusion">Conclusão</TabsTrigger>
              <TabsTrigger value="final">Final</TabsTrigger>
            </TabsList>

            {/* Introduction Tab */}
            <TabsContent value="intro" className="space-y-6">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Título do sermão"
                  maxLength={200}
                />
              </div>

              <div>
                <Label htmlFor="theme">Tema</Label>
                <Input
                  id="theme"
                  value={formData.theme}
                  onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
                  placeholder="Tema principal"
                  maxLength={200}
                />
              </div>

              <div>
                <Label htmlFor="textBase">Texto Base *</Label>
                <Input
                  id="textBase"
                  value={formData.textBase}
                  onChange={(e) => setFormData(prev => ({ ...prev, textBase: e.target.value }))}
                  placeholder="Ex: João 3:16-21"
                  maxLength={200}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="preacher">Pregador</Label>
                  <Input
                    id="preacher"
                    value={formData.preacher}
                    onChange={(e) => setFormData(prev => ({ ...prev, preacher: e.target.value }))}
                    placeholder="Nome do pregador"
                    maxLength={100}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="introduction">Introdução</Label>
                <Textarea
                  id="introduction"
                  value={formData.introduction}
                  onChange={(e) => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
                  placeholder="Contextualize o tema, captando a atenção do público..."
                  className="min-h-[200px]"
                  maxLength={5000}
                />
              </div>

              <div>
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="Ex: salvação, graça, amor"
                  maxLength={200}
                />
              </div>

              <div>
                <Label htmlFor="introTransition">Transição da Introdução para o Ponto 1</Label>
                <Textarea
                  id="introTransition"
                  value={formData.introTransition}
                  onChange={(e) => setFormData(prev => ({ ...prev, introTransition: e.target.value }))}
                  placeholder="Crie uma ponte suave, ligando a ideia geral da introdução ao primeiro ponto..."
                  className="min-h-[100px]"
                  maxLength={1000}
                />
              </div>
            </TabsContent>

            {/* Point 1-4 Tabs */}
            {(['point1', 'point2', 'point3', 'point4'] as const).map((pointKey, index) => (
              <TabsContent key={pointKey} value={pointKey} className="space-y-6">
                <div>
                  <Label>Título do Ponto {index + 1}</Label>
                  <Input
                    value={formData[pointKey].title}
                    onChange={(e) => updatePoint(pointKey, 'title', e.target.value)}
                    placeholder="Frase curta e impactante"
                    maxLength={200}
                  />
                </div>

                <div>
                  <Label>Desenvolvimento</Label>
                  <Textarea
                    value={formData[pointKey].development}
                    onChange={(e) => updatePoint(pointKey, 'development', e.target.value)}
                    placeholder="Explique o ponto com profundidade..."
                    className="min-h-[150px]"
                    maxLength={5000}
                  />
                </div>

                <div>
                  <Label>Afirmação do Desenvolvimento</Label>
                  <Textarea
                    value={formData[pointKey].affirmation}
                    onChange={(e) => updatePoint(pointKey, 'affirmation', e.target.value)}
                    placeholder="Resuma a ideia principal em uma frase clara"
                    className="min-h-[80px]"
                    maxLength={1000}
                  />
                </div>

                <div>
                  <Label>Citação</Label>
                  <Textarea
                    value={formData[pointKey].citation}
                    onChange={(e) => updatePoint(pointKey, 'citation', e.target.value)}
                    placeholder="Insira citação de livro, autor ou versículo"
                    className="min-h-[80px]"
                    maxLength={1000}
                  />
                </div>

                <div>
                  <Label>Referências</Label>
                  <Input
                    value={formData[pointKey].references}
                    onChange={(e) => updatePoint(pointKey, 'references', e.target.value)}
                    placeholder="Ex: Mateus 5:3-12, Romanos 8:28"
                    maxLength={300}
                  />
                </div>

                <div>
                  <Label>Frase de Efeito</Label>
                  <Input
                    value={formData[pointKey].catchPhrase}
                    onChange={(e) => updatePoint(pointKey, 'catchPhrase', e.target.value)}
                    placeholder="Frase impactante para criar efeito duradouro"
                    maxLength={200}
                  />
                </div>

                <div>
                  <Label>Aplicação Prática</Label>
                  <Textarea
                    value={formData[pointKey].application}
                    onChange={(e) => updatePoint(pointKey, 'application', e.target.value)}
                    placeholder="Como aplicar este ponto na vida diária..."
                    className="min-h-[150px]"
                    maxLength={3000}
                  />
                </div>

                <div>
                  <Label>Transição para o Próximo Ponto</Label>
                  <Textarea
                    value={formData[pointKey].transition}
                    onChange={(e) => updatePoint(pointKey, 'transition', e.target.value)}
                    placeholder="Conecte este ponto ao próximo..."
                    className="min-h-[80px]"
                    maxLength={1000}
                  />
                </div>
              </TabsContent>
            ))}

            {/* Conclusion Tab */}
            <TabsContent value="conclusion" className="space-y-6">
              <div>
                <Label htmlFor="conclusion">Conclusão</Label>
                <Textarea
                  id="conclusion"
                  value={formData.conclusion}
                  onChange={(e) => setFormData(prev => ({ ...prev, conclusion: e.target.value }))}
                  placeholder="Faça um resumo dos pontos principais..."
                  className="min-h-[200px]"
                  maxLength={5000}
                />
              </div>
            </TabsContent>

            {/* Final Tab */}
            <TabsContent value="final" className="space-y-6">
              <div>
                <Label htmlFor="prayer">Oração</Label>
                <Textarea
                  id="prayer"
                  value={formData.prayer}
                  onChange={(e) => setFormData(prev => ({ ...prev, prayer: e.target.value }))}
                  placeholder="Uma oração que abrange o tema e os pontos..."
                  className="min-h-[150px]"
                  maxLength={3000}
                />
              </div>

              <div>
                <Label htmlFor="appeal">Apelo</Label>
                <Textarea
                  id="appeal"
                  value={formData.appeal}
                  onChange={(e) => setFormData(prev => ({ ...prev, appeal: e.target.value }))}
                  placeholder="Um chamado claro à ação..."
                  className="min-h-[150px]"
                  maxLength={3000}
                />
              </div>
            </TabsContent>
          </Tabs>

          {/* Print View - Hidden on screen, visible on print */}
          <div className="hidden print:block space-y-6">
            <div className="text-center border-b-2 pb-4 mb-6">
              <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
              {formData.theme && <p className="text-lg"><strong>Tema:</strong> {formData.theme}</p>}
              <p className="text-lg"><strong>Texto Base:</strong> {formData.textBase}</p>
              {formData.preacher && <p><strong>Pregador:</strong> {formData.preacher}</p>}
              <p><strong>Data:</strong> {format(new Date(formData.date), 'dd/MM/yyyy')}</p>
            </div>

            {formData.introduction && (
              <div>
                <h2 className="font-bold text-xl mb-2">Introdução</h2>
                <p className="whitespace-pre-wrap">{formData.introduction}</p>
              </div>
            )}

            {formData.introTransition && (
              <div className="mt-4">
                <h3 className="font-semibold mb-1">Transição da Introdução para o Ponto 1:</h3>
                <p className="whitespace-pre-wrap">{formData.introTransition}</p>
              </div>
            )}

            {[
              { key: 'point1' as const, num: 1 },
              { key: 'point2' as const, num: 2 },
              { key: 'point3' as const, num: 3 },
              { key: 'point4' as const, num: 4 }
            ].map(({ key, num }) => (
              formData[key].title && (
                <div key={key} className="mt-6">
                  <h2 className="font-bold text-xl mb-3">{num}º Ponto: {formData[key].title}</h2>
                  
                  {formData[key].development && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Desenvolvimento:</h3>
                      <p className="whitespace-pre-wrap">{formData[key].development}</p>
                    </div>
                  )}
                  
                  {formData[key].affirmation && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Afirmação:</h3>
                      <p className="whitespace-pre-wrap">{formData[key].affirmation}</p>
                    </div>
                  )}
                  
                  {formData[key].citation && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Citação:</h3>
                      <p className="italic whitespace-pre-wrap">"{formData[key].citation}"</p>
                    </div>
                  )}
                  
                  {formData[key].references && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Referências:</h3>
                      <p>{formData[key].references}</p>
                    </div>
                  )}
                  
                  {formData[key].catchPhrase && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Frase de Efeito:</h3>
                      <p className="font-bold">"{formData[key].catchPhrase}"</p>
                    </div>
                  )}
                  
                  {formData[key].application && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Aplicação Prática:</h3>
                      <p className="whitespace-pre-wrap">{formData[key].application}</p>
                    </div>
                  )}
                  
                  {formData[key].transition && (
                    <div className="mb-3">
                      <h3 className="font-semibold mb-1">Transição:</h3>
                      <p className="whitespace-pre-wrap">{formData[key].transition}</p>
                    </div>
                  )}
                </div>
              )
            ))}

            {formData.conclusion && (
              <div className="mt-6">
                <h2 className="font-bold text-xl mb-2">Conclusão</h2>
                <p className="whitespace-pre-wrap">{formData.conclusion}</p>
              </div>
            )}

            {formData.prayer && (
              <div className="mt-6">
                <h2 className="font-bold text-xl mb-2">Oração</h2>
                <p className="whitespace-pre-wrap">{formData.prayer}</p>
              </div>
            )}

            {formData.appeal && (
              <div className="mt-6">
                <h2 className="font-bold text-xl mb-2">Apelo</h2>
                <p className="whitespace-pre-wrap">{formData.appeal}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SermonEditor;
