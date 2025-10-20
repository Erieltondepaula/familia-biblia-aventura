import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import { saveSermon, updateSermon, getSermon, Sermon, SermonPoint } from '@/lib/sermonsStorage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RichTextEditor } from '@/components/RichTextEditor';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Printer, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { SafeHTML } from '@/components/SafeHTML';

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
      updateSermon(id, { ...formData, tags: tagsArray });
      toast.success('Sermão atualizado!');
    } else {
      saveSermon({ profileId: currentProfile.id, ...formData, tags: tagsArray });
      toast.success('Sermão salvo!');
    }

    navigate('/sermons');
  };

  const handlePrint = () => { window.print(); };

  const updatePoint = (pointKey: 'point1' | 'point2' | 'point3' | 'point4', field: keyof SermonPoint, value: string) => {
    setFormData(prev => ({ ...prev, [pointKey]: { ...prev[pointKey], [field]: value } }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{`@media print{body *{visibility:hidden}.print-content,.print-content *{visibility:visible}.print-content{position:absolute;left:0;top:0;width:100%}.no-print{display:none!important}}`}</style>

      <div className="no-print mb-8">
        <Button variant="ghost" onClick={() => navigate('/sermons')} className="mb-4">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar aos Sermões
        </Button>
        {/* MODIFICAÇÃO PARA RESPONSIVIDADE APLICADA AQUI */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold">{id ? 'Editar Sermão' : 'Novo Sermão'}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}><Printer className="mr-2 w-4 h-4" />Imprimir</Button>
            <Button onClick={handleSave}><Save className="mr-2 w-4 h-4" />Salvar</Button>
          </div>
        </div>
      </div>

      <div className="print-content">
        <Card className="p-4 sm:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="no-print">
            {/* MODIFICAÇÃO PARA RESPONSIVIDADE APLICADA AQUI */}
            <div className="w-full overflow-x-auto pb-2">
                <TabsList className="grid grid-flow-col auto-cols-auto gap-1">
                    <TabsTrigger value="intro">Intro</TabsTrigger>
                    <TabsTrigger value="point1">Ponto 1</TabsTrigger>
                    <TabsTrigger value="point2">Ponto 2</TabsTrigger>
                    <TabsTrigger value="point3">Ponto 3</TabsTrigger>
                    <TabsTrigger value="point4">Ponto 4</TabsTrigger>
                    <TabsTrigger value="conclusion">Conclusão</TabsTrigger>
                    <TabsTrigger value="final">Final</TabsTrigger>
                    <TabsTrigger value="preview"><Eye className="w-4 h-4 mr-1" />Preview</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="intro" className="space-y-6 mt-6">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} placeholder="Título do sermão" />
              </div>
              <div>
                <Label htmlFor="theme">Tema</Label>
                <Input id="theme" value={formData.theme} onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))} placeholder="Tema principal" />
              </div>
              <div>
                <Label htmlFor="textBase">Texto Base *</Label>
                <Input id="textBase" value={formData.textBase} onChange={(e) => setFormData(prev => ({ ...prev, textBase: e.target.value }))} placeholder="Ex: João 3:16-21" />
              </div>
              {/* MODIFICAÇÃO PARA RESPONSIVIDADE APLICADA AQUI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Data</Label>
                  <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} />
                </div>
                <div>
                  <Label htmlFor="preacher">Pregador</Label>
                  <Input id="preacher" value={formData.preacher} onChange={(e) => setFormData(prev => ({ ...prev, preacher: e.target.value }))} placeholder="Nome do pregador" />
                </div>
              </div>
              <div>
                <Label htmlFor="introduction">Introdução</Label>
                <RichTextEditor value={formData.introduction} onChange={(value) => setFormData(prev => ({ ...prev, introduction: value }))} placeholder="Contextualize o tema..." minHeight="200px" />
              </div>
              <div>
                <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                <Input id="tags" value={formData.tags} onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))} placeholder="Ex: salvação, graça, amor" />
              </div>
              <div>
                <Label htmlFor="introTransition">Transição da Introdução</Label>
                <RichTextEditor value={formData.introTransition} onChange={(value) => setFormData(prev => ({ ...prev, introTransition: value }))} placeholder="Crie uma ponte para o primeiro ponto..." minHeight="100px" />
              </div>
            </TabsContent>

            {(['point1', 'point2', 'point3', 'point4'] as const).map((pointKey, index) => (
              <TabsContent key={pointKey} value={pointKey} className="space-y-6 mt-6">
                <div><Label>Título do Ponto {index + 1}</Label><Input value={formData[pointKey].title} onChange={(e) => updatePoint(pointKey, 'title', e.target.value)} placeholder="Frase curta e impactante" /></div>
                <div><Label>Desenvolvimento</Label><RichTextEditor value={formData[pointKey].development} onChange={(value) => updatePoint(pointKey, 'development', value)} placeholder="Explique o ponto..." minHeight="150px" /></div>
                <div><Label>Afirmação</Label><RichTextEditor value={formData[pointKey].affirmation} onChange={(value) => updatePoint(pointKey, 'affirmation', value)} placeholder="Resuma a ideia principal..." minHeight="80px" /></div>
                <div><Label>Citação</Label><RichTextEditor value={formData[pointKey].citation} onChange={(value) => updatePoint(pointKey, 'citation', value)} placeholder="Insira citação de livro, autor ou versículo" minHeight="80px" /></div>
                <div><Label>Referências</Label><Input value={formData[pointKey].references} onChange={(e) => updatePoint(pointKey, 'references', e.target.value)} placeholder="Ex: Mateus 5:3-12, Romanos 8:28" /></div>
                <div><Label>Frase de Efeito</Label><Input value={formData[pointKey].catchPhrase} onChange={(e) => updatePoint(pointKey, 'catchPhrase', e.target.value)} placeholder="Frase impactante para criar efeito duradouro" /></div>
                <div><Label>Aplicação Prática</Label><RichTextEditor value={formData[pointKey].application} onChange={(value) => updatePoint(pointKey, 'application', value)} placeholder="Como aplicar este ponto na vida diária..." minHeight="150px" /></div>
                <div><Label>Transição para o Próximo Ponto</Label><RichTextEditor value={formData[pointKey].transition} onChange={(value) => updatePoint(pointKey, 'transition', value)} placeholder="Conecte este ponto ao próximo..." minHeight="80px" /></div>
              </TabsContent>
            ))}

            <TabsContent value="conclusion" className="space-y-6 mt-6">
              <div>
                <Label htmlFor="conclusion">Conclusão</Label>
                <RichTextEditor value={formData.conclusion} onChange={(value) => setFormData(prev => ({ ...prev, conclusion: value }))} placeholder="Faça um resumo dos pontos principais..." minHeight="200px" />
              </div>
            </TabsContent>

            <TabsContent value="final" className="space-y-6 mt-6">
              <div>
                <Label htmlFor="prayer">Oração</Label>
                <RichTextEditor value={formData.prayer} onChange={(value) => setFormData(prev => ({ ...prev, prayer: value }))} placeholder="Uma oração que abrange o tema e os pontos..." minHeight="150px" />
              </div>
              <div>
                <Label htmlFor="appeal">Apelo</Label>
                <RichTextEditor value={formData.appeal} onChange={(value) => setFormData(prev => ({ ...prev, appeal: value }))} placeholder="Um chamado claro à ação..." minHeight="150px" />
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="prose dark:prose-invert max-w-none mt-6">
                <h2>Preview de Impressão</h2>
                <SafeHTML 
                  html={`<h1>${formData.title}</h1><h2>${formData.theme}</h2><p><strong>Texto Base:</strong> ${formData.textBase}</p><h3>Introdução</h3>${formData.introduction}`}
                />
            </TabsContent>

          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default SermonEditor;