import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft,
  Lightbulb,
  MessageSquare,
  Star,
  Sparkles
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { getReadingByDay } from "@/lib/readingPlanData";
import { toast } from "sonner";

const ReadingDay = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const { markChapterAsRead, isChapterCompleted, addXP } = useProgress();
  
  const dayNumber = parseInt(day || "1");
  const reading = getReadingByDay(dayNumber);
  const isCompleted = isChapterCompleted(dayNumber);

  const [checkedChapters, setCheckedChapters] = useState<Set<string>>(
    new Set(isCompleted ? reading?.chapters : [])
  );
  const [notes, setNotes] = useState("");
  const [memorizedVerse, setMemorizedVerse] = useState(false);

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
    if (!memorizedVerse) {
      setMemorizedVerse(true);
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

    markChapterAsRead(dayNumber, reading.chapters);
    
    let totalXP = reading.chapters.length * 84; // 84 XP per chapter
    if (notes.trim().length > 0) {
      addXP(50);
      totalXP += 50;
    }

    toast.success(`Leitura concluída! +${totalXP} XP`, {
      description: `Parabéns! Continue sua jornada de fé.`
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Dia {reading.day} - {reading.book}</h1>
              <p className="text-white/80">{reading.date}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Card */}
        <Card className="p-6 mb-6 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Progresso da Leitura
            </h3>
            <Badge variant={isCompleted ? "default" : "outline"} className={isCompleted ? "bg-success" : ""}>
              {Math.round(progress)}%
            </Badge>
          </div>
          <Progress value={progress} className="h-3" />
        </Card>

        {/* Chapters Checklist */}
        <Card className="p-8 mb-6 shadow-card">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Capítulos de Hoje
          </h2>
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

        {/* Devotional */}
        <Card className="p-8 mb-6 shadow-card bg-gradient-to-br from-primary/5 to-transparent">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-accent" />
            Devocional
          </h2>
          <p className="text-lg leading-relaxed text-foreground/90">
            {reading.devotional}
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
            placeholder="Escreva suas reflexões pessoais aqui..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[120px] text-base"
          />
          {notes.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              +50 XP ao concluir com anotações
            </p>
          )}
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
      </div>
    </div>
  );
};

export default ReadingDay;
