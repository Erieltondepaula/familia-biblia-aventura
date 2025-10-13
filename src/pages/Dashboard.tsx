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
  Home,
  MessageSquare,
  Users,
  HeartHandshake,
  Heart,
  Shield,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress"; // A importação correta está aqui
import { useProfile } from "@/hooks/useProfile";
import { getCurrentDayReading } from "@/lib/mccheyneReadingPlan";
import { getLocalDateString } from "@/lib/dateUtils";
import MemorizedVerses from "@/components/MemorizedVerses";
import ThemeToggle from "@/components/ThemeToggle";
import { SuggestionsDialog } from "@/components/SuggestionsDialog";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { currentProfile } = useProfile();
  const { signOut } = useAuth();
  const { isAdmin } = useAdmin();
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
  const isCompleted = todayReading ? isChapterCompleted(todayReading.day) : false;
  
  const currentDate = getLocalDateString();

  if (!todayReading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Carregando plano de leitura...
      </div>
    );
  }

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
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <SuggestionsDialog />
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" className="text-white hover:bg-white/20">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              )}
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
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20"
                onClick={signOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Progress Card */}
          <Card className="lg:col-span-2 p-8 shadow-card">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Olá, {currentProfile?.name || "Usuário"}! 👋</h2>
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge className="bg-gradient-glory text-accent-foreground text-base px-4 py-2">
                    {levelName}
                  </Badge>
                  <Badge variant="outline" className="text-base px-4 py-2 border-2">
                    Nível {level}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-base mt-2">Continue sua jornada de fé hoje</p>
              </div>
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
                <Progress value={(xpToNextLevel > 0 ? (xp / xpToNextLevel) * 100 : 0)} className="h-3" />
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
                    Plano M'Cheyne
                  </span>
                  <span className="text-sm text-muted-foreground">
                    4 capítulos/dia
                  </span>
                </div>
                <Progress value={isCompleted ? 100 : 0} className="h-3" />
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
            
            <Link to="/contribute">
                <Card className="p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 cursor-pointer bg-gradient-to-br from-amber-500/5 to-transparent">
                    <div className="flex items-center justify-between mb-2">
                        <HeartHandshake className="w-8 h-8 text-amber-500" />
                        <span className="text-2xl font-bold text-amber-600">Apoie</span>
                    </div>
                    <p className="font-semibold">Gostou do Projeto?</p>
                    <p className="text-sm text-muted-foreground">
                        Clique aqui e ajude a manter a plataforma no ar.
                    </p>
                </Card>
            </Link>
          </div>
        </div>

        {/* Today's Reading */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className={`lg:col-span-2 p-8 shadow-card border-2 ${isCompleted ? 'border-success/50 bg-success/5' : 'border-primary/20'}`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">Leitura de Hoje</h3>
                <p className="text-muted-foreground">Dia {todayReading.day} - {currentDate}</p>
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

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-sm text-blue-700 dark:text-blue-400">Leitura Familiar</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900">AT</Badge>
                    <span className="font-semibold">{todayReading.familyOT}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900">NT</Badge>
                    <span className="font-semibold">{todayReading.familyNT}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="font-bold text-sm text-purple-700 dark:text-purple-400">Leitura Pessoal</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900">AT</Badge>
                    <span className="font-semibold">{todayReading.personalOT}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900">NT</Badge>
                    <span className="font-semibold">{todayReading.personalNT}</span>
                  </div>
                </div>
              </div>
            </div>

            <Link to={`/reading/${todayReading.day}`}>
              <Button className="w-full" size="lg" variant={isCompleted ? "success" : "default"}>
                <BookOpen className="w-5 h-5 mr-2" />
                {isCompleted ? "Ver Leitura Novamente" : "Começar Leitura"}
              </Button>
            </Link>
          </Card>

          <div className="space-y-6">
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
                  <p className="text-2xl font-bold text-secondary">{xpToNextLevel > xp ? xpToNextLevel - xp : 0} XP</p>
                </div>
                <div className="p-4 bg-gradient-glory rounded-lg">
                  <p className="text-sm text-accent-foreground/80 mb-1">Seu Nível</p>
                  <p className="text-xl font-bold text-accent-foreground">{levelName}</p>
                </div>
              </div>
            </Card>
            <MemorizedVerses />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <Link to="/devotional" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <Heart className="w-6 h-6" />
              <span className="text-xs md:text-sm">Devocional</span>
            </Button>
          </Link>
          <Link to="/quiz" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <Target className="w-6 h-6" />
              <span className="text-xs md:text-sm">Quiz Diário</span>
            </Button>
          </Link>
          <Link to="/statistics" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <TrendingUp className="w-6 h-6" />
              <span className="text-xs md:text-sm">Estatísticas</span>
            </Button>
          </Link>
          <Link to="/progress" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <Flame className="w-6 h-6" />
              <span className="text-xs md:text-sm">Progresso</span>
            </Button>
          </Link>
          <Link to="/achievements" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <Trophy className="w-6 h-6" />
              <span className="text-xs md:text-sm">Conquistas</span>
            </Button>
          </Link>
          <Link to="/verses" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <BookOpen className="w-6 h-6" />
              <span className="text-xs md:text-sm">Versículos</span>
            </Button>
          </Link>
          <Link to="/sermons" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <Star className="w-6 h-6" />
              <span className="text-xs md:text-sm">Sermões</span>
            </Button>
          </Link>
          <Link to="/reflections" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-auto py-6 flex-col gap-2">
              <MessageSquare className="w-6 h-6" />
              <span className="text-xs md:text-sm">Reflexões</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;