import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile"; // <-- CORREÇÃO APLICADA AQUI
import { getAllReflections, Reflection } from "@/lib/reflectionsStorage";
import { ArrowLeft, MessageSquare, Calendar } from "lucide-react";
import { getReadingByDay } from "@/lib/readingPlanData";

const Reflections = () => {
  const { currentProfile } = useProfile();
  const [reflections, setReflections] = useState<Reflection[]>([]);

  useEffect(() => {
    document.title = "Reflexões | Jornada Bíblica";
    if (currentProfile) {
      const allReflections = getAllReflections(currentProfile.id);
      // Sort by day descending
      setReflections(allReflections.sort((a, b) => b.day - a.day));
    }
  }, [currentProfile]);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Minhas Reflexões
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {reflections.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Nenhuma reflexão ainda</h2>
            <p className="text-muted-foreground mb-6">
              Comece a escrever suas reflexões durante as leituras diárias
            </p>
            <Link to="/dashboard">
              <Button>Ir para Dashboard</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Total de {reflections.length} reflexões
              </p>
            </div>

            {reflections.map((reflection) => {
              const reading = getReadingByDay(reflection.day);
              return (
                <Card key={reflection.day} className="p-6 shadow-card hover:shadow-elevated transition-smooth">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        Dia {reflection.day} - {reading?.book || "Leitura"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {new Date(reflection.date).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    <Link to={`/reading/${reflection.day}`}>
                      <Button variant="outline" size="sm">
                        Ver Leitura
                      </Button>
                    </Link>
                  </div>

                  {reading && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {reading.chapters.map((chapter, idx) => (
                          <Badge key={idx} variant="secondary">
                            {chapter}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      Minha Reflexão:
                    </p>
                    <p className="text-foreground whitespace-pre-wrap">
                      {reflection.notes}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Reflections;