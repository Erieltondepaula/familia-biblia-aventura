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
    const list: { title: string; desc: string; earned: boolean }[] = [
      { title: "Primeiro Passo", desc: "Conclua 1 dia de leitura", earned: totalDaysRead >= 1 },
      { title: "Fogo Aceso", desc: "Leituras por 3 dias seguidos", earned: currentStreak >= 3 },
      { title: "Constância", desc: "7 dias de leitura", earned: totalDaysRead >= 7 },
      { title: "Maratonista", desc: "Progresso da Bíblia acima de 10%", earned: bibleProgress >= 10 },
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

      <main className="container mx-auto px-4 py-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(a => (
          <Card key={a.title} className={`p-6 border-2 ${a.earned ? 'border-success/50 bg-success/5' : 'border-border'}`}>
            <h2 className="text-lg font-bold mb-1">{a.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{a.desc}</p>
            <Badge className={a.earned ? 'bg-success text-white' : ''}>{a.earned ? 'Conquistado' : 'Bloqueado'}</Badge>
          </Card>
        ))}
      </main>
    </div>
  );
};

export default Achievements;