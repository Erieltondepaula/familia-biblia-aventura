import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProgress } from "@/contexts/ProgressContext";
import { ArrowLeft, TrendingUp } from "lucide-react";

const ProgressDetails = () => {
  const { xp, level, levelName, bibleProgress, xpToNextLevel, completedReadings, currentStreak, totalDaysRead } = useProgress();

  useEffect(() => { document.title = "Progresso | Jornada Bíblica"; }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><TrendingUp className="w-6 h-6"/> Progresso</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 grid lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Experiência</span>
              <span className="text-sm text-muted-foreground">{xp} / {xpToNextLevel} XP</span>
            </div>
            <Progress value={(xp / xpToNextLevel) * 100} className="h-3" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Progresso Bíblico</span>
              <span className="text-sm text-muted-foreground">{bibleProgress}%</span>
            </div>
            <Progress value={bibleProgress} className="h-3" />
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-glory text-accent-foreground">{levelName} - Nível {level}</Badge>
            <Badge variant="outline">Streak: {currentStreak}</Badge>
            <Badge variant="outline">Dias lidos: {totalDaysRead}</Badge>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Leituras Concluídas</h2>
          <div className="space-y-3 max-h-[360px] overflow-auto pr-2">
            {completedReadings.length === 0 && (
              <p className="text-muted-foreground">Nenhuma leitura concluída ainda.</p>
            )}
            {completedReadings.map(r => (
              <div key={r.day} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-semibold">Dia {r.day}</p>
                  <p className="text-sm text-muted-foreground">{r.chapters.join(", ")}</p>
                </div>
                <span className="text-sm text-muted-foreground">{new Date(r.completedAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ProgressDetails;