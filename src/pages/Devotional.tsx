import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Heart, CheckCircle, MessageSquare } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useProgress } from '@/hooks/useProgress';
import { getCurrentDayReading } from '@/lib/mccheyneReadingPlan';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { RichTextEditor } from '@/components/RichTextEditor';
import { SafeHTML } from '@/components/SafeHTML';
import { logger } from '@/lib/logger';

const Devotional = () => {
  const { currentProfile } = useProfile();
  const { addXP } = useProgress();
  const todayReading = getCurrentDayReading();
  
  const [notes, setNotes] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadDevotionalProgress = useCallback(async () => {
    if (!currentProfile || !todayReading) return;

    setLoading(true);
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
      } else {
        setIsCompleted(false);
        setNotes('');
      }
    } catch (error) {
      logger.error('Erro ao carregar devocional:', error);
      toast.error('Não foi possível carregar o progresso do devocional.');
    } finally {
      setLoading(false);
    }
  }, [currentProfile, todayReading]);

  useEffect(() => {
    document.title = 'Devocional | Jornada Bíblica';
    if (currentProfile && todayReading) {
      loadDevotionalProgress();
    } else if (!todayReading) {
      setLoading(false);
    }
  }, [loadDevotionalProgress, currentProfile, todayReading]);

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
        let xpGained = 25;
        if (notes.trim().length > 0) {
          xpGained += 50;
        }
        await addXP(xpGained);
        toast.success(`Devocional concluído! +${xpGained} XP`);
      } else {
        toast.success('Anotações atualizadas!');
      }
      
      setIsCompleted(true);
    } catch (error) {
      logger.error('Erro ao salvar devocional:', error);
      toast.error('Erro ao salvar devocional');
    }
  };

  if (loading) {
    return (
        <div className="w-full px-4 md:px-6 lg:px-8 py-8 space-y-6">
            <Skeleton className="h-16 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
            <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  if (!todayReading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center p-4">
        <div>
            <h2 className="text-2xl font-bold mb-4">Plano de Leitura não Encontrado</h2>
            <p className="text-muted-foreground mb-6">Não foi possível carregar o conteúdo do devocional de hoje.</p>
            <Link to="/dashboard">
                <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar ao Dashboard
                </Button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated animate-fade-in">
        <div className="w-full px-4 md:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 btn-interactive">
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

      <main className="w-full px-4 md:px-6 lg:px-8 py-8">
        <div className="space-y-6 animate-slide-up">
          {isCompleted && (
            <Card className="border-2 border-success bg-success/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-semibold">Devocional Concluído!</p>
                    <p className="text-sm text-muted-foreground">Você já completou o devocional de hoje.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Versículo do Dia
            </h2>
            <p className="text-sm text-muted-foreground mb-3">Fundamento para a reflexão de hoje</p>
            <div className="p-6 bg-card rounded-lg border-2 border-primary/60 shadow-lg">
              <p className="text-lg font-medium italic leading-relaxed">"{todayReading.verseOfDay}"</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Coluna Esquerda - Noite */}
            <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6 flex flex-col min-h-[400px]">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-3 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/20">
                  🌙 Devocional da Noite
                </Badge>
                <h3 className="text-lg font-bold text-accent">
                  Baseado em {todayReading.eveningVerse}
                </h3>
              </div>
              <SafeHTML 
                html={todayReading.eveningDevotional}
                className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line prose prose-sm prose-p:my-2 dark:prose-invert max-w-none flex-1"
              />
            </div>

            {/* Coluna Centro - Reflexão */}
            <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6 flex flex-col min-h-[400px]">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-secondary" />
                Perguntas para Reflexão
              </h2>
              <SafeHTML 
                html={todayReading.reflection}
                className="text-sm leading-relaxed whitespace-pre-line prose prose-sm prose-p:my-2 dark:prose-invert max-w-none flex-1"
              />
            </div>

            {/* Coluna Direita - Manhã */}
            <div className="bg-card rounded-lg border shadow-sm p-4 md:p-6 flex flex-col min-h-[400px]">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-3 bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                  ☀️ Devocional da Manhã
                </Badge>
                <h3 className="text-lg font-bold text-accent">
                  Baseado em {todayReading.morningVerse}
                </h3>
              </div>
              <SafeHTML 
                html={todayReading.morningDevotional}
                className="text-sm leading-relaxed text-foreground/90 whitespace-pre-line prose prose-sm prose-p:my-2 dark:prose-invert max-w-none flex-1"
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Minhas Anotações</CardTitle>
              <CardDescription>Registre suas reflexões e como você aplicará isso em sua vida.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* === SUBSTITUIÇÃO APLICADA AQUI === */}
              <RichTextEditor
                value={notes}
                onChange={setNotes}
                placeholder="Como este devocional falou com você? Que ação prática você tomará hoje?"
                minHeight="150px"
              />
              <Button 
                onClick={handleComplete} 
                className="w-full btn-interactive" 
                size="lg"
                variant={isCompleted ? "secondary" : "default"}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {isCompleted ? 'Atualizar Anotações' : 'Finalizar Devocional (+XP)'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Devotional;