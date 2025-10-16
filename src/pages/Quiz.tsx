import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Target, CheckCircle2, XCircle } from "lucide-react";
import { getReadingByDay, getCurrentDayNumber } from "@/lib/mccheyneReadingPlan";
import { useProgress } from "@/contexts/useProgress";
import { awardQuizXP } from "@/lib/progressCalculations";
import { generateQuiz, QuizQuestion } from "@/lib/quizGenerator";
import { toast } from "sonner";

const Quiz = () => {
  const { day } = useParams();
  const dayNumber = day ? parseInt(day) : getCurrentDayNumber();
  const reading = getReadingByDay(dayNumber);
  const { addXP } = useProgress();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { document.title = "Quiz Diário | Jornada Bíblica"; }, []);

  const questions: QuizQuestion[] = useMemo(() => {
    if (!reading) return [];
    return generateQuiz(reading);
  }, [reading]);

  const score = useMemo(() => {
    if (!submitted) return 0;
    let s = 0;
    questions.forEach((qu, i) => {
      if (answers[i] === qu.correct) s++;
    });
    return s;
  }, [answers, questions, submitted]);

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

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      toast.error("Responda todas as perguntas primeiro!");
      return;
    }
    setSubmitted(true);

    let finalScore = 0;
    questions.forEach((qu, i) => {
      if (answers[i] === qu.correct) finalScore++;
    });

    const xp = awardQuizXP(finalScore, questions.length);
    if (xp > 0) {
      addXP(xp);
      if (finalScore === questions.length) {
        toast.success(`🎉 Perfeito! Todas corretas! +${xp} XP`);
      } else {
        toast.success(`Quiz concluído! ${finalScore}/${questions.length} corretas. +${xp} XP`);
      }
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
        <Card className="p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Quiz do Dia {dayNumber}</h2>
            <p className="text-muted-foreground">
              Teste seus conhecimentos sobre as leituras: {reading.familyOT}, {reading.familyNT}, {reading.personalOT}, {reading.personalNT}
            </p>
          </div>

          <div className="space-y-6">
            {questions.map((qu, i) => (
              <Card key={i} className="p-6 border-2">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge className="mt-1">{i + 1}</Badge>
                    <p className="font-semibold text-lg flex-1">{qu.question}</p>
                  </div>

                  <div className="grid gap-3">
                    {qu.options.map((opt, optIndex) => {
                      const isSelected = answers[i] === optIndex;
                      const isCorrect = qu.correct === optIndex;
                      const showResult = submitted;

                      let variant: "outline" | "default" | "success" | "destructive" = "outline";
                      if (isSelected && !showResult) variant = "default";
                      if (showResult && isCorrect) variant = "success";
                      if (showResult && isSelected && !isCorrect) variant = "destructive";

                      return (
                        <Button 
                          key={optIndex}
                          variant={variant}
                          className="justify-start text-left h-auto py-3 px-4"
                          onClick={() => !submitted && setAnswers(a => ({ ...a, [i]: optIndex }))}
                          disabled={submitted}
                        >
                          <span className="flex items-center gap-2 w-full">
                            {showResult && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                            {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                            <span className="flex-1">{opt}</span>
                          </span>
                        </Button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className={`p-4 rounded-lg ${answers[i] === qu.correct ? 'bg-success/10' : 'bg-muted'}`}>
                      <p className="text-sm font-medium">
                        {answers[i] === qu.correct ? '✓ Correto!' : '✗ Incorreto'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{qu.explanation}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {submitted && (
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {score === questions.length ? '🎉 Perfeito!' : `${score}/${questions.length} Corretas`}
                  </h3>
                  <Progress value={(score / questions.length) * 100} className="h-3 mb-2"/>
                  <p className="text-muted-foreground">
                    {score === questions.length 
                      ? 'Você acertou todas as perguntas! Parabéns!' 
                      : 'Continue estudando a Palavra de Deus!'}
                  </p>
                </div>
              </Card>
            )}

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleSubmit} 
              disabled={submitted || Object.keys(answers).length < questions.length}
            >
              {submitted ? 'Quiz Concluído' : 'Enviar Respostas'}
            </Button>

            {submitted && (
              <Link to="/dashboard">
                <Button variant="outline" className="w-full" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Voltar ao Dashboard
                </Button>
              </Link>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Quiz;