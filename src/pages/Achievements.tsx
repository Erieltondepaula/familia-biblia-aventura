import { useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { ArrowLeft, Trophy } from "lucide-react";

const Achievements = () => {
  const { totalDaysRead, currentStreak, bibleProgress } = useProgress();

  useEffect(() => { document.title = "Conquistas | Jornada Bíblica"; }, []);

  const achievements = useMemo(() => {
    const list: { title: string; desc: string; earned: boolean; icon: string }[] = [
      { title: "Primeiro Passo", desc: "Conclua 1 dia de leitura", earned: totalDaysRead >= 1, icon: "🎯" },
      { title: "Fogo Aceso", desc: "Leituras por 3 dias seguidos (perde se parar)", earned: currentStreak >= 3, icon: "🔥" },
      { title: "Semana Santa", desc: "7 dias consecutivos de leitura", earned: currentStreak >= 7, icon: "📅" },
      { title: "Constância", desc: "Complete 30 dias de leitura", earned: totalDaysRead >= 30, icon: "⭐" },
      { title: "Maratonista", desc: "Progresso da Bíblia acima de 10%", earned: bibleProgress >= 10, icon: "🏃" },
      { title: "Leitor Dedicado", desc: "Progresso da Bíblia acima de 25%", earned: bibleProgress >= 25, icon: "📖" },
      { title: "Estudioso", desc: "Progresso da Bíblia acima de 50%", earned: bibleProgress >= 50, icon: "🎓" },
      { title: "Mestre das Escrituras", desc: "Complete 100% da Bíblia", earned: bibleProgress >= 100, icon: "👑" },
      { title: "Sequência Impressionante", desc: "30 dias consecutivos (reseta se perder 1 dia)", earned: currentStreak >= 30, icon: "💪" },
    ];
    return list;
  }, [totalDaysRead, currentStreak, bibleProgress]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy className="w-6 h-6"/> Conquistas</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="p-6 mb-6 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            ⚠️ Sistema de Conquistas com Reset
          </h2>
          <p className="text-muted-foreground">
            As conquistas baseadas em sequência (🔥 Fogo Aceso, 📅 Semana Santa, 💪 Sequência Impressionante) 
            <strong> resetam automaticamente se você perder um dia de leitura</strong>. 
            Mantenha sua consistência para manter suas conquistas!
          </p>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(a => (
            <Card key={a.title} className={`p-6 border-2 transition-all ${a.earned ? 'border-success/50 bg-success/5 shadow-lg' : 'border-border opacity-70'}`}>
              <div className="text-4xl mb-3">{a.icon}</div>
              <h2 className="text-lg font-bold mb-1">{a.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>
              <Badge className={a.earned ? 'bg-success text-white' : 'bg-muted text-muted-foreground'}>
                {a.earned ? '✓ Conquistado' : '🔒 Bloqueado'}
              </Badge>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Achievements;