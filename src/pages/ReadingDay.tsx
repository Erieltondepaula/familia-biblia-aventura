import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import CircularProgress from "@/components/CircularProgress";
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  Star,
  Sparkles,
  CalendarDays
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { useProfile } from "@/contexts/ProfileContext";
import { getReadingByDay, readingPlan, getCurrentDayNumber } from "@/lib/readingPlanData";
import { saveReflection, getReflection } from "@/lib/reflectionsStorage";
import { markVerseAsMemorized, isVerseMemorized } from "@/lib/memorizationStorage";
import { calculateLevel } from "@/lib/progressCalculations";
import LevelUpModal from "@/components/LevelUpModal";
import { toast } from "sonner";

const ReadingDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { currentProfile } = useProfile();
  const { markChapterAsRead, isChapterCompleted, addXP, xp, level } = useProgress();
  
  const dayNumber = parseInt(day || "1");
  const reading = getReadingByDay(dayNumber);
  const isCompleted = isChapterCompleted(dayNumber);

  const [checkedChapters, setCheckedChapters] = useState<Set<string>>(
    new Set(isCompleted ? reading?.chapters : [])
  );
  const [notes, setNotes] = useState("");
  const [memorizedVerse, setMemorizedVerse] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);

  // Load saved reflection and memorization status
  useEffect(() => {
    if (currentProfile && reading) {
      const savedReflection = getReflection(currentProfile.id, dayNumber);
      setNotes(savedReflection);
      
      const alreadyMemorized = isVerseMemorized(currentProfile.id, dayNumber);
      setMemorizedVerse(alreadyMemorized);
    }
  }, [currentProfile, dayNumber, reading]);

  // Auto-save reflection
  useEffect(() => {
    if (currentProfile && reading) {
      const timer = setTimeout(() => {
        saveReflection(currentProfile.id, dayNumber, notes);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [notes, currentProfile, dayNumber, reading]);

  if (!reading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Dia não encontrado</h2>
          <Link to="/dashboard">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentDay = getCurrentDayNumber();
  const isFutureDay = dayNumber > currentDay;

  const allChaptersChecked = reading.chapters.every(ch => checkedChapters.has(ch));
  const progress = (checkedChapters.size / reading.chapters.length) * 100;

  const handleChapterToggle = (chapter: string) => {
    const newChecked = new Set(checkedChapters);
    if (newChecked.has(chapter)) {
      newChecked.delete(chapter);
    } else {
      newChecked.add(chapter);
    }
    setCheckedChapters(newChecked);
  };

  const handleMemorizeVerse = () => {
    if (!currentProfile) return;
    
    if (!memorizedVerse) {
      setMemorizedVerse(true);
      markVerseAsMemorized(currentProfile.id, dayNumber);
      addXP(100);
      toast.success("Versículo memorizado! +100 XP", {
        description: "Continue memorizando a Palavra!"
      });
    }
  };

  const handleCompleteReading = () => {
    if (!allChaptersChecked) {
      toast.error("Complete todos os capítulos primeiro!", {
        description: "Marque todos os capítulos como lidos antes de finalizar"
      });
      return;
    }

    if (isCompleted) {
      toast.info("Você já completou esta leitura!", {
        description: "Mas pode relê-la sempre que quiser"
      });
      return;
    }

    const currentLevel = level;
    
    markChapterAsRead(dayNumber, reading.chapters);
    
    let totalXP = reading.chapters.length * 84; // 84 XP per chapter
    if (notes.trim().length > 0) {
      addXP(50);
      totalXP += 50;
    }

    // Check if leveled up
    const levelAfter = calculateLevel(xp + totalXP);
    if (levelAfter > currentLevel) {
      setNewLevel(levelAfter);
      setShowLevelUp(true);
    }

    toast.success(`Leitura concluída! +${totalXP} XP`, {
      description: `Parabéns! Continue sua jornada de fé.`
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const goToPreviousDay = () => {
    if (dayNumber > 1) {
      navigate(`/reading/${dayNumber - 1}`);
    }
  };

  const goToNextDay = () => {
    const currentDay = getCurrentDayNumber();
    // Only allow navigation to next day if it's not a future day
    if (dayNumber < readingPlan.length && dayNumber < currentDay) {
      navigate(`/reading/${dayNumber + 1}`);
    } else if (dayNumber >= currentDay) {
      toast.error("Não é possível acessar dias futuros", {
        description: "Aguarde até meia-noite para o próximo dia"
      });
    }
  };

  const markAllAsRead = () => {
    const allChapters = new Set(reading.chapters);
    setCheckedChapters(allChapters);
    toast.success("Todos os capítulos marcados como lidos!");
  };

  return (
    <div className="min-h-screen bg-background">
      <LevelUpModal level={newLevel} show={showLevelUp} onClose={() => setShowLevelUp(false)} />
      
      {isFutureDay && (
        <div className="bg-destructive/10 border-b-2 border-destructive/20 py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="text-destructive font-semibold">
              ⚠️ Este dia ainda não está disponível. Aguarde até meia-noite para acessá-lo.
            </p>
          </div>
        </div>
      )}
      
      {/* Header */}
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-6 h-6" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <CalendarDays className="w-6 h-6" />
                  Dia {reading.day}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">AT: {reading.oldTestament}</Badge>
                  <span className="text-white/60">+</span>
                  <Badge variant="secondary" className="text-xs">NT: {reading.newTestament}</Badge>
                </div>
              </div>
            </div>
            
            {/* Day Navigation */}
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={goToPreviousDay}
                disabled={dayNumber <= 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={goToNextDay}
                disabled={dayNumber >= currentDay}
                title={dayNumber >= currentDay ? "Aguarde até meia-noite" : "Próximo dia"}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {isFutureDay ? (
          <Card className="p-12 text-center">
            <CalendarDays className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Dia Bloqueado</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Este dia ainda não está disponível. O sistema libera um novo dia automaticamente à meia-noite (00:00).
            </p>
            <div className="p-6 bg-muted/30 rounded-lg mb-6">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Dia atual do plano:</p>
              <Badge variant="default" className="text-xl px-6 py-3">
                Dia {currentDay} de 365
              </Badge>
            </div>
            <Link to="/dashboard">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </Card>
        ) : (
          <>
        {/* Progress Card with Circular Progress */}
        <Card className="p-6 mb-6 shadow-card">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <CircularProgress value={progress} size={100} />
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-semibold text-lg flex items-center justify-center md:justify-start gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Progresso da Leitura
              </h3>
              <p className="text-muted-foreground mb-2">
                {checkedChapters.size} de {reading.chapters.length} capítulos lidos
              </p>
              <Badge variant={isCompleted ? "default" : "outline"} className={isCompleted ? "bg-success" : ""}>
                {isCompleted ? "✓ Dia Completo" : "Em Progresso"}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Chapters Checklist */}
        <Card className="p-8 mb-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              Capítulos de Hoje
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={markAllAsRead}
              disabled={allChaptersChecked || isCompleted}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Marcar Todos
            </Button>
          </div>
          <div className="space-y-4">
            {reading.chapters.map((chapter, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-4 p-5 rounded-lg border-2 transition-all ${
                  checkedChapters.has(chapter) 
                    ? 'bg-success/10 border-success/30' 
                    : 'bg-muted/30 border-border hover:border-primary/30'
                }`}
              >
                <Checkbox
                  id={`chapter-${idx}`}
                  checked={checkedChapters.has(chapter)}
                  onCheckedChange={() => handleChapterToggle(chapter)}
                  className="w-6 h-6"
                />
                <label 
                  htmlFor={`chapter-${idx}`} 
                  className={`text-lg font-semibold cursor-pointer flex-1 ${
                    checkedChapters.has(chapter) ? 'line-through text-muted-foreground' : ''
                  }`}
                >
                  {chapter}
                </label>
                {checkedChapters.has(chapter) && (
                  <CheckCircle2 className="w-5 h-5 text-success" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Morning Devotional */}
        <Card className="p-8 mb-6 shadow-card bg-gradient-to-br from-amber-500/5 to-transparent">
          <div className="mb-6">
            <Badge variant="outline" className="mb-3">
              🌅 Devocional da Manhã
            </Badge>
            <h2 className="text-xl font-bold flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <Lightbulb className="w-5 h-5" />
              {reading.morningVerse}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
            {reading.morningDevotional}
          </p>
        </Card>

        {/* Evening Devotional */}
        <Card className="p-8 mb-6 shadow-card bg-gradient-to-br from-indigo-500/5 to-transparent">
          <div className="mb-6">
            <Badge variant="outline" className="mb-3">
              🌙 Devocional da Noite
            </Badge>
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
              <Star className="w-5 h-5" />
              {reading.eveningVerse}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-foreground/90 whitespace-pre-line">
            {reading.eveningDevotional}
          </p>
        </Card>

        {/* Reflection */}
        <Card className="p-8 mb-6 shadow-card bg-gradient-to-br from-secondary/5 to-transparent">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-secondary" />
            Reflexão
          </h2>
          <p className="text-lg leading-relaxed text-foreground/90 mb-4">
            {reading.reflection}
          </p>
          <Textarea
            placeholder="Exemplo: 'Hoje percebi que preciso confiar mais em Deus nas minhas decisões do trabalho. Vou orar todas as manhãs antes de começar o dia...'"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[120px] text-base"
          />
          <div className="flex items-center justify-between mt-2">
            {notes.length > 0 && (
              <p className="text-sm text-success">
                ✓ Reflexão salva automaticamente
              </p>
            )}
            {notes.length > 0 && (
              <p className="text-sm text-muted-foreground">
                +50 XP ao concluir com anotações
              </p>
            )}
          </div>
        </Card>

        {/* Key Verse */}
        <Card className="p-8 mb-6 shadow-card bg-gradient-glory">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-accent-foreground">
            <Star className="w-6 h-6" />
            Versículo para Memorizar
          </h2>
          <p className="text-xl font-semibold leading-relaxed text-accent-foreground mb-6 italic">
            "{reading.keyVerse}"
          </p>
          <Button
            variant={memorizedVerse ? "success" : "default"}
            size="lg"
            onClick={handleMemorizeVerse}
            disabled={memorizedVerse}
            className="w-full"
          >
            {memorizedVerse ? (
              <>
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Versículo Memorizado! (+100 XP)
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Marcar como Memorizado
              </>
            )}
          </Button>
        </Card>

        {/* Complete Button */}
        <Card className="p-6 shadow-elevated border-2 border-primary/20">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-2">
              {isCompleted ? "Leitura já concluída!" : "Pronto para finalizar?"}
            </h3>
            <p className="text-muted-foreground">
              {isCompleted 
                ? "Você já completou esta leitura. Pode voltar ao dashboard ou continuar revisando."
                : allChaptersChecked 
                  ? "Todos os capítulos foram lidos. Clique para finalizar e ganhar XP!"
                  : "Complete todos os capítulos antes de finalizar"}
            </p>
          </div>
          <Button
            size="xl"
            className="w-full"
            onClick={handleCompleteReading}
            disabled={!allChaptersChecked || isCompleted}
            variant={allChaptersChecked && !isCompleted ? "success" : "default"}
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            {isCompleted ? "Concluído" : "Finalizar Leitura"}
          </Button>
        </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadingDay;
