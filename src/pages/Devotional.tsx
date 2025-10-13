import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Heart, CheckCircle, Sparkles } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { getCurrentDayReading } from '@/lib/mccheyneReadingPlan';
import { getDevotionalContent } from '@/lib/devotionalContent';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Devotional = () => {
  const { currentProfile } = useProfile();
  const { addXP } = useProgress();
  const todayReading = getCurrentDayReading();
  
  const [notes, setNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Devocional | Jornada Bíblica';
    loadDevotionalProgress();
  }, [currentProfile, todayReading]);

  const loadDevotionalProgress = async () => {
    if (!currentProfile || !todayReading) return;

    try {
      const { data, error } = await supabase
        .from('devotional_progress')
        .select('*')
        .eq('profile_id', currentProfile.id)
        .eq('day', todayReading.day)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setIsCompleted(true);
        setNotes(data.notes || '');
      }
    } catch (error) {
      console.error('Erro ao carregar devocional:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!currentProfile || !todayReading) return;

    try {
      const { error } = await supabase
        .from('devotional_progress')
        .upsert({
          profile_id: currentProfile.id,
          day: todayReading.day,
          notes: notes.trim(),
          completed_at: new Date().toISOString()
        }, {
          onConflict: 'profile_id,day'
        });

      if (error) throw error;

      if (!isCompleted) {
        await addXP(50); // Bônus por completar devocional
        toast.success('Devocional concluído! +50 XP', {
          description: 'Continue crescendo em sua jornada de fé!'
        });
      } else {
        toast.success('Anotações atualizadas!');
      }
      
      setIsCompleted(true);
    } catch (error) {
      console.error('Erro ao salvar devocional:', error);
      toast.error('Erro ao salvar devocional');
    }
  };

  if (loading || !todayReading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando devocional...
      </div>
    );
  }

  const devotional = getDevotionalContent(todayReading.day);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="w-6 h-6" />
                Devocional Diário
              </h1>
              <p className="text-sm text-white/80">Dia {todayReading.day} - Reflexão e Aplicação</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Status */}
          {isCompleted && (
            <Card className="border-2 border-success bg-success/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-semibold">Devocional Concluído!</p>
                    <p className="text-sm text-muted-foreground">
                      Você já completou o devocional de hoje
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Versículo Base */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Versículo Base
              </CardTitle>
              <CardDescription>Fundamento para a reflexão de hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border-l-4 border-primary">
                <p className="text-lg font-semibold mb-2 italic">"{devotional.verse.text}"</p>
                <Badge variant="outline" className="mt-2">
                  {devotional.verse.reference}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Reflexão */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Reflexão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed whitespace-pre-line">
                {devotional.reflection}
              </p>
            </CardContent>
          </Card>

          {/* Aplicação Prática */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-accent" />
                Aplicação Prática
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">
                {devotional.application}
              </p>
            </CardContent>
          </Card>

          {/* Anotações Pessoais */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Minhas Anotações</CardTitle>
              <CardDescription>
                Registre suas reflexões e como você aplicará isso em sua vida
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Como este devocional falou com você? Que ação prática você tomará hoje?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                className="resize-none"
              />
              <Button 
                onClick={handleComplete} 
                className="w-full" 
                size="lg"
                variant={isCompleted ? "secondary" : "default"}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {isCompleted ? 'Atualizar Anotações' : 'Finalizar Devocional'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Devotional;
