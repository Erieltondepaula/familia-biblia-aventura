import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Target } from "lucide-react";
import { getCurrentDayReading } from "@/lib/readingPlanData";
import { useProgress } from "@/contexts/ProgressContext";
import { awardQuizXP } from "@/lib/progressCalculations";
import { toast } from "sonner";

interface Question {
  q: string;
  options: string[];
  correct: string;
}

const Quiz = () => {
  const today = getCurrentDayReading();
  const { addXP } = useProgress();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { document.title = "Quiz Diário | Jornada Bíblica"; }, []);

  const questions: Question[] = useMemo(() => {
    // Perguntas simples baseadas no livro do dia (placeholder)
    return [
      { q: `O livro de ${today.book} aparece no Antigo Testamento.`, options: ["Verdadeiro", "Falso"], correct: "Verdadeiro" },
      { q: `A leitura de hoje inclui ${today.chapters.length} capítulo(s).`, options: ["Verdadeiro", "Falso"], correct: "Verdadeiro" },
      { q: `O versículo-chave está em ${today.book}.`, options: ["Verdadeiro", "Falso"], correct: "Verdadeiro" },
      { q: "Deus criou os céus e a terra no início.", options: ["Verdadeiro", "Falso"], correct: "Verdadeiro" },
      { q: "Noé não foi lembrado por Deus durante o dilúvio.", options: ["Verdadeiro", "Falso"], correct: "Falso" },
    ];
  }, [today]);

  const score = useMemo(() => {
    let s = 0; questions.forEach((qu, i) => { if (answers[i] === qu.correct) s++; }); return s;
  }, [answers, questions]);

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Responda todas as perguntas");
      return;
    }
    setSubmitted(true);
    const xp = awardQuizXP(score, questions.length);
    if (xp > 0) {
      addXP(xp);
      toast.success(`Quiz concluído! +${xp} XP`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-6 h-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Target className="w-6 h-6"/> Quiz Diário</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-6 space-y-6">
          {questions.map((qu, i) => (
            <div key={i} className="space-y-3">
              <p className="font-semibold">{i + 1}. {qu.q}</p>
              <div className="grid grid-cols-2 gap-3">
                {qu.options.map(opt => (
                  <Button 
                    key={opt}
                    variant={answers[i] === opt ? "success" : "outline"} 
                    onClick={() => setAnswers(a => ({ ...a, [i]: opt }))}
                  >
                    {opt}
                  </Button>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-3">
            <Progress value={(score / questions.length) * 100} className="h-2"/>
            <p className="text-sm text-muted-foreground">Acertos: {score} de {questions.length}</p>
            <Button className="w-full" size="lg" onClick={handleSubmit} disabled={submitted}>Enviar Respostas</Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Quiz;