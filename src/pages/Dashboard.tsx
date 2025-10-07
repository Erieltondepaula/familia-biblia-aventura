import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Calendar,
  Star,
  Flame,
  TrendingUp,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { getCurrentDayReading } from "@/lib/readingPlanData";
import { toast } from "sonner";

const Dashboard = () => {
  const { 
    xp, 
    level, 
    levelName, 
    currentStreak, 
    totalDaysRead, 
    bibleProgress, 
    xpToNextLevel,
    isChapterCompleted 
  } = useProgress();

  const todayReading = getCurrentDayReading();
  const isCompleted = isChapterCompleted(todayReading.day);

// Removidos toasts de navegação; agora usamos rotas dedicadas

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold flex items-center gap-2 hover:opacity-80 transition-smooth">
                <Home className="w-6 h-6" />
                Jornada Bíblica
              </h1>
            </Link>
<div className="flex items-center gap-4">
  <Link to="/profiles">
    <Button variant="ghost" className="text-white hover:bg-white/20">
      Perfis
    </Button>
  </Link>
  <Link to="/settings">
    <Button variant="ghost" className="text-white hover:bg-white/20">
      Configurações
    </Button>
  </Link>
</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Progress Card */}
          <Card className="lg:col-span-2 p-8 shadow-card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Olá, João! 👋</h2>
                <p className="text-muted-foreground text-lg">Continue sua jornada de fé hoje</p>
              </div>
              <Badge className="bg-gradient-glory text-accent-foreground text-lg px-4 py-2">
                {levelName} - Nível {level}
              </Badge>
            </div>

            <div className="space-y-6">
              {/* XP Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    Experiência
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {xp} / {xpToNextLevel} XP
                  </span>
                </div>
                <Progress value={(xp / xpToNextLevel) * 100} className="h-3" />
              </div>

              {/* Bible Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Progresso Bíblico
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {bibleProgress}%
                  </span>
                </div>
                <Progress value={bibleProgress} className="h-3" />
              </div>

              {/* Current Book Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-secondary" />
                    {todayReading.book}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Em progresso
                  </span>
                </div>
                <Progress value={20} className="h-3" />
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="space-y-6">
            <Card className="p-6 shadow-card bg-gradient-faith text-white">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8" />
                <span className="text-3xl font-bold">{currentStreak}</span>
              </div>
              <p className="font-semibold">Dias Consecutivos</p>
              <p className="text-sm text-white/80">
                {currentStreak === 0 ? "Comece hoje!" : "Continue assim!"}
              </p>
            </Card>

            <Card className="p-6 shadow-card bg-gradient-growth text-white">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8" />
                <span className="text-3xl font-bold">{totalDaysRead}</span>
              </div>
              <p className="font-semibold">Dias de Leitura</p>
              <p className="text-sm text-white/80">De 365 dias</p>
            </Card>
          </div>
        </div>

        {/* Today's Reading */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className={`lg:col-span-2 p-8 shadow-card border-2 ${isCompleted ? 'border-success/50 bg-success/5' : 'border-primary/20'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">Leitura de Hoje</h3>
                <p className="text-muted-foreground">Dia {todayReading.day} - {todayReading.date}</p>
              </div>
              {isCompleted ? (
                <Badge className="bg-success text-white text-lg px-4 py-2">
                  ✓ Concluído
                </Badge>
              ) : (
                <Badge variant="outline" className="text-lg px-4 py-2">
                  Pendente
                </Badge>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {todayReading.chapters.map((chapter, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">{idx + 1}</span>
                  </div>
                  <span className="font-semibold text-lg">{chapter}</span>
                </div>
              ))}
            </div>

            <Link to={`/reading/${todayReading.day}`}>
              <Button className="w-full" size="lg" variant={isCompleted ? "success" : "default"}>
                <BookOpen className="w-5 h-5 mr-2" />
                {isCompleted ? "Ver Leitura Novamente" : "Começar Leitura"}
              </Button>
            </Link>
          </Card>

          {/* Quick Info */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              Progresso de Hoje
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">XP Total</p>
                <p className="text-2xl font-bold text-primary">{xp} XP</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Próximo Nível</p>
                <p className="text-2xl font-bold text-secondary">{xpToNextLevel - xp} XP</p>
              </div>
              <div className="p-4 bg-gradient-glory rounded-lg">
                <p className="text-sm text-accent-foreground/80 mb-1">Seu Nível</p>
                <p className="text-xl font-bold text-accent-foreground">{levelName}</p>
              </div>
            </div>
          </Card>
        </div>

{/* Quick Actions */}
<div className="grid md:grid-cols-4 gap-4">
  <Link to="/quiz">
    <Button 
      variant="outline" 
      size="lg" 
      className="h-auto py-6 flex-col gap-2"
    >
      <Target className="w-6 h-6" />
      <span>Quiz Diário</span>
    </Button>
  </Link>
  <Link to="/progress">
    <Button 
      variant="outline" 
      size="lg" 
      className="h-auto py-6 flex-col gap-2"
    >
      <TrendingUp className="w-6 h-6" />
      <span>Progresso</span>
    </Button>
  </Link>
  <Link to="/achievements">
    <Button 
      variant="outline" 
      size="lg" 
      className="h-auto py-6 flex-col gap-2"
    >
      <Trophy className="w-6 h-6" />
      <span>Conquistas</span>
    </Button>
  </Link>
  <Link to="/verses">
    <Button 
      variant="outline" 
      size="lg" 
      className="h-auto py-6 flex-col gap-2"
    >
      <BookOpen className="w-6 h-6" />
      <span>Versículos</span>
    </Button>
  </Link>
</div>
      </div>
    </div>
  );
};

export default Dashboard;
