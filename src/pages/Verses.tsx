import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { useProgress } from "@/contexts/ProgressContext";
import { awardMemorizationXP } from "@/lib/progressCalculations";
import { ArrowLeft, BookOpen, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Verse { id: string; text: string; memorized: boolean; }

const Verses = () => {
  const { currentProfile } = useProfile();
  const { addXP } = useProgress();
  const key = `verses_${currentProfile?.id || 'default'}`;
  const [verses, setVerses] = useState<Verse[]>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");

  useEffect(() => { document.title = "Versículos | Jornada Bíblica"; }, []);
  useEffect(() => { localStorage.setItem(key, JSON.stringify(verses)); }, [verses, key]);

  const addVerse = () => {
    if (!text.trim()) return;
    const v: Verse = { id: crypto.randomUUID?.() || String(Date.now()), text: text.trim(), memorized: false };
    setVerses(prev => [v, ...prev]);
    setText("");
  };

  const markMemorized = (id: string) => {
    setVerses(prev => prev.map(v => v.id === id ? { ...v, memorized: true } : v));
    const xp = awardMemorizationXP();
    addXP(xp);
    toast.success(`Versículo memorizado! +${xp} XP`);
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
          <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="w-6 h-6"/> Versículos</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="p-6 mb-6">
          <div className="flex gap-2">
            <Input placeholder="Ex.: João 3:16 — ..." value={text} onChange={(e) => setText(e.target.value)} />
            <Button onClick={addVerse}>Adicionar</Button>
          </div>
        </Card>

        <div className="grid gap-4">
          {verses.length === 0 && (
            <Card className="p-6 text-center text-muted-foreground">Nenhum versículo adicionado ainda.</Card>
          )}
          {verses.map(v => (
            <Card key={v.id} className={`p-6 flex items-center justify-between ${v.memorized ? 'border-success/50 bg-success/5' : ''}`}>
              <div>
                <p className="font-semibold">{v.text}</p>
                <Badge variant="outline" className="mt-2">{v.memorized ? 'Memorizado' : 'Para memorizar'}</Badge>
              </div>
              <Button variant={v.memorized ? 'success' : 'default'} disabled={v.memorized} onClick={() => markMemorized(v.id)}>
                {v.memorized ? (<><CheckCircle2 className="w-4 h-4 mr-2"/> Feito</>) : 'Marcar como memorizado'}
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Verses;