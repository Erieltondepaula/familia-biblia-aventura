import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Trophy, 
  Target, 
  Calendar,
  CheckCircle2,
  Star,
  Flame,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Mock data - will be replaced with real data from backend
  const userProgress = {
    name: "João Silva",
    level: 5,
    xp: 450,
    xpToNextLevel: 600,
    currentStreak: 7,
    totalDaysRead: 45,
    bibleProgress: 12.3,
    currentBook: "Gênesis",
    currentBookProgress: 80,
  };

  const todayReading = {
    day: 45,
    date: "2025-01-15",
    chapters: ["Gênesis 45", "Gênesis 46", "Gênesis 47"],
    completed: false,
  };

  const recentRewards = [
    { name: "Pergaminho de Sabedoria", type: "rare", xp: 50 },
    { name: "Harpa de Davi", type: "epic", xp: 100 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold">Jornada Bíblica</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Perfis
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/20">
                Configurações
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
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">Olá, {userProgress.name}! 👋</h2>
                <p className="text-muted-foreground text-lg">Continue sua jornada de fé hoje</p>
              </div>
              <Badge className="bg-gradient-glory text-accent-foreground text-lg px-4 py-2">
                Nível {userProgress.level}
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
                    {userProgress.xp} / {userProgress.xpToNextLevel} XP
                  </span>
                </div>
                <Progress value={(userProgress.xp / userProgress.xpToNextLevel) * 100} className="h-3" />
              </div>

              {/* Bible Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Progresso Bíblico
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {userProgress.bibleProgress}%
                  </span>
                </div>
                <Progress value={userProgress.bibleProgress} className="h-3" />
              </div>

              {/* Current Book Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold flex items-center gap-2">
                    <Target className="w-5 h-5 text-secondary" />
                    {userProgress.currentBook}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {userProgress.currentBookProgress}%
                  </span>
                </div>
                <Progress value={userProgress.currentBookProgress} className="h-3" />
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="space-y-6">
            <Card className="p-6 shadow-card bg-gradient-faith text-white">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-8 h-8" />
                <span className="text-3xl font-bold">{userProgress.currentStreak}</span>
              </div>
              <p className="font-semibold">Dias Consecutivos</p>
              <p className="text-sm text-white/80">Continue assim!</p>
            </Card>

            <Card className="p-6 shadow-card bg-gradient-growth text-white">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8" />
                <span className="text-3xl font-bold">{userProgress.totalDaysRead}</span>
              </div>
              <p className="font-semibold">Dias de Leitura</p>
              <p className="text-sm text-white/80">De 365 dias</p>
            </Card>
          </div>
        </div>

        {/* Today's Reading */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 p-8 shadow-card border-2 border-primary/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">Leitura de Hoje</h3>
                <p className="text-muted-foreground">Dia {todayReading.day} - {todayReading.date}</p>
              </div>
              {!todayReading.completed && (
                <Badge variant="outline" className="text-lg px-4 py-2">
                  Pendente
                </Badge>
              )}
            </div>

            <div className="space-y-4 mb-6">
              {todayReading.chapters.map((chapter, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-smooth">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-lg">{chapter}</span>
                </div>
              ))}
            </div>

            <Button className="w-full" size="lg" variant="default">
              <BookOpen className="w-5 h-5 mr-2" />
              Começar Leitura
            </Button>
          </Card>

          {/* Rewards */}
          <Card className="p-6 shadow-card">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-accent" />
              Recompensas Recentes
            </h3>
            <div className="space-y-3">
              {recentRewards.map((reward, idx) => (
                <div key={idx} className="p-4 bg-gradient-glory rounded-lg">
                  <p className="font-semibold text-accent-foreground">{reward.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="outline" className="text-xs">
                      {reward.type}
                    </Badge>
                    <span className="text-sm font-semibold">+{reward.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todas
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Button variant="outline" size="lg" className="h-auto py-6 flex-col gap-2">
            <Target className="w-6 h-6" />
            <span>Quiz Diário</span>
          </Button>
          <Button variant="outline" size="lg" className="h-auto py-6 flex-col gap-2">
            <TrendingUp className="w-6 h-6" />
            <span>Progresso</span>
          </Button>
          <Button variant="outline" size="lg" className="h-auto py-6 flex-col gap-2">
            <Trophy className="w-6 h-6" />
            <span>Conquistas</span>
          </Button>
          <Button variant="outline" size="lg" className="h-auto py-6 flex-col gap-2">
            <BookOpen className="w-6 h-6" />
            <span>Versículos</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
