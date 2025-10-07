import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "@/components/CircularProgress";
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  Star,
  Sparkles,
  CalendarDays,
  Home,
  Users
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { useProfile } from "@/contexts/ProfileContext";
import { 
  getReadingByDay, 
  getAllChapters,
  getCurrentDayNumber,
  mcCheyneReadingPlan,
  calculateReadingProgress 
} from "@/lib/mccheyneReadingPlan";
import { getLocalDateString } from "@/lib/dateUtils";
import { saveReflection, getReflection } from "@/lib/reflectionsStorage";
import { markVerseAsMemorized, isVerseMemorized } from "@/lib/memorizationStorage";
import { calculateLevel } from "@/lib/progressCalculations";
import LevelUpModal from "@/components/LevelUpModal";
import { toast } from "sonner";

const ReadingDayMcCheyne = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { currentProfile } = useProfile();
  const { markChapterAsRead, isChapterCompleted, addXP, xp, level, totalChaptersRead } = useProgress();
  
  const dayNumber = parseInt(day || "1");
  const reading = getReadingByDay(dayNumber);
  const isCompleted = isChapterCompleted(dayNumber);

  const [checkedChapters, setCheckedChapters] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState("");
  const [memorizedVerse, setMemorizedVerse] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);

  // Load saved data
  useEffect(() => {
    if (currentProfile && reading) {
      const savedReflection = getReflection(currentProfile.id, dayNumber);
      setNotes(savedReflection);
      
      const alreadyMemorized = isVerseMemorized(currentProfile.id, dayNumber);
      setMemorizedVerse(alreadyMemorized);

      if (isCompleted) {
        const allChaps = getAllChapters(reading);
        setCheckedChapters(new Set(allChaps));
      }
    }
  }, [currentProfile, dayNumber, reading, isCompleted]);

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
  const allChapters = getAllChapters(reading);
  const allChaptersChecked = allChapters.every(ch => checkedChapters.has(ch));
  const progress = calculateReadingProgress(Array.from(checkedChapters), allChapters);
  const totalBibleProgress = Math.round((totalChaptersRead() / (365 * 4)) * 100);

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
    if (!currentProfile || memorizedVerse) return;
    
    setMemorizedVerse(true);
    markVerseAsMemorized(currentProfile.id, dayNumber);
    addXP(100);
    toast.success("Versículo memorizado! +100 XP");
  };

  const handleCompleteReading = () => {
    if (!allChaptersChecked) {
      toast.error("Complete todos os capítulos primeiro!");
      return;
    }

    if (isCompleted) {
      toast.info("Você já completou esta leitura!");
      return;
    }

    const currentLevel = level;
    markChapterAsRead(dayNumber, allChapters);
    
    let totalXP = allChapters.length * 84; // 84 XP per chapter
    if (notes.trim().length > 0) {
      addXP(50);
      totalXP += 50;
    }

    const levelAfter = calculateLevel(xp + totalXP);
    if (levelAfter > currentLevel) {
      setNewLevel(levelAfter);
      setShowLevelUp(true);
    }

    toast.success(`Leitura concluída! +${totalXP} XP`);
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const goToPreviousDay = () => {
    if (dayNumber > 1) navigate(`/reading/${dayNumber - 1}`);
  };

  const goToNextDay = () => {
    if (dayNumber < mcCheyneReadingPlan.length) {
      navigate(`/reading/${dayNumber + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LevelUpModal level={newLevel} show={showLevelUp} onClose={() => setShowLevelUp(false)} />
      
      {isFutureDay && (
        <div className="bg-destructive/10 border-b-2 border-destructive/20 py-3">
          <div className="container mx-auto px-4 text-center">
            <p className="text-destructive font-semibold">
              ⚠️ Este dia ainda não está disponível. Aguarde até meia-noite.
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
                  Dia {reading.day} - Plano M'Cheyne
                </h1>
                <p className="text-white/80 text-sm mt-1">{getLocalDateString()}</p>
              </div>
            </div>
            
            {/* Navigation */}
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
                disabled={dayNumber >= mcCheyneReadingPlan.length}
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
              O sistema libera um novo dia automaticamente à meia-noite (00:00).
            </p>
            <Link to="/dashboard">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Voltar ao Dashboard
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Progress Overview */}
            <Card className="p-6 mb-6 shadow-card">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <CircularProgress value={progress} size={100} />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-lg flex items-center justify-center md:justify-start gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Progresso do Dia
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {checkedChapters.size} de {allChapters.length} capítulos lidos
                  </p>
                  <div className="space-y-1">
                    <Badge variant={isCompleted ? "default" : "outline"} className={isCompleted ? "bg-success" : ""}>
                      {isCompleted ? "✓ Dia Completo" : "Em Progresso"}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Progresso Total da Bíblia: {totalBibleProgress}%
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Family Reading */}
            <Card className="p-6 mb-6 shadow-card border-l-4 border-blue-500">
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400">Leitura Familiar</h2>
                <Badge variant="secondary" className="ml-auto">2 capítulos</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <Checkbox
                    checked={checkedChapters.has(reading.familyOT)}
                    onCheckedChange={() => handleChapterToggle(reading.familyOT)}
                    className="w-5 h-5"
                  />
                  <span className="flex-1 font-semibold">{reading.familyOT}</span>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">AT</Badge>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <Checkbox
                    checked={checkedChapters.has(reading.familyNT)}
                    onCheckedChange={() => handleChapterToggle(reading.familyNT)}
                    className="w-5 h-5"
                  />
                  <span className="flex-1 font-semibold">{reading.familyNT}</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">NT</Badge>
                </div>
              </div>
            </Card>

            {/* Personal Reading */}
            <Card className="p-6 mb-6 shadow-card border-l-4 border-purple-500">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400">Leitura Pessoal</h2>
                <Badge variant="secondary" className="ml-auto">2 capítulos</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                  <Checkbox
                    checked={checkedChapters.has(reading.personalOT)}
                    onCheckedChange={() => handleChapterToggle(reading.personalOT)}
                    className="w-5 h-5"
                  />
                  <span className="flex-1 font-semibold">{reading.personalOT}</span>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">AT</Badge>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
                  <Checkbox
                    checked={checkedChapters.has(reading.personalNT)}
                    onCheckedChange={() => handleChapterToggle(reading.personalNT)}
                    className="w-5 h-5"
                  />
                  <span className="flex-1 font-semibold">{reading.personalNT}</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">NT</Badge>
                </div>
              </div>
            </Card>

            {/* Morning Devotional */}
            <Card className="p-8 mb-6 shadow-card bg-gradient-to-br from-amber-500/5 to-transparent">
              <div className="mb-6">
                <Badge variant="outline" className="mb-3">🌅 Devocional da Manhã</Badge>
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
                <Badge variant="outline" className="mb-3">🌙 Devocional da Noite</Badge>
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
              {notes.length > 0 && (
                <p className="text-sm text-success mt-2">✓ Reflexão salva automaticamente (+50 XP ao concluir)</p>
              )}
            </Card>

            {/* Verse Memorization */}
            <Card className="p-8 mb-6 shadow-card bg-gradient-glory">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-accent-foreground">
                <Star className="w-6 h-6" />
                Versículo do Dia para Memorizar
              </h2>
              <p className="text-xl font-semibold leading-relaxed text-accent-foreground mb-6 italic">
                "{reading.verseOfDay}"
              </p>
              <Button
                variant={memorizedVerse ? "success" : "default"}
                size="lg"
                onClick={handleMemorizeVerse}
                disabled={memorizedVerse}
                className="w-full"
              >
                {memorizedVerse ? (
                  <><CheckCircle2 className="w-5 h-5 mr-2" />Memorizado! (+100 XP)</>
                ) : (
                  <><Sparkles className="w-5 h-5 mr-2" />Marcar como Memorizado</>
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
                    ? "Você já completou esta leitura."
                    : allChaptersChecked 
                      ? "Todos os capítulos foram lidos. Clique para finalizar!"
                      : "Complete todos os 4 capítulos antes de finalizar"}
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

export default ReadingDayMcCheyne;
