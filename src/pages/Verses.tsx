import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useProgress } from "@/hooks/useProgress"; // <-- ATUALIZE ESTA LINHA
import { awardMemorizationXP } from "@/lib/progressCalculations";
import { ArrowLeft, BookOpen, CheckCircle2, Pencil, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";

interface Verse { id: string; text: string; memorized: boolean; }

const Verses = () => {
  const { currentProfile } = useProfile();
  const { addXP } = useProgress();
  const key = `verses_${currentProfile?.id || 'default'}`;
  const [verses, setVerses] = useState<Verse[]>([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => { 
    document.title = "Versículos | Jornada Bíblica"; 
  }, []);

  useEffect(() => {
    if (currentProfile) {
        const saved = localStorage.getItem(key);
        setVerses(saved ? JSON.parse(saved) : []);
    }
  }, [key, currentProfile]);
  
  useEffect(() => {
    if (currentProfile) {
        localStorage.setItem(key, JSON.stringify(verses));
    }
  }, [verses, key, currentProfile]);

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

  const startEdit = (verse: Verse) => {
    setEditingId(verse.id);
    setEditText(verse.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) {
      toast.error("O versículo não pode estar vazio");
      return;
    }
    setVerses(prev => prev.map(v => v.id === id ? { ...v, text: editText.trim() } : v));
    setEditingId(null);
    setEditText("");
    toast.success("Versículo atualizado!");
  };

  const deleteVerse = (id: string) => {
    setVerses(prev => prev.filter(v => v.id !== id));
    toast.success("Versículo removido!");
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
            <Card key={v.id} className={`p-6 ${v.memorized ? 'border-success/50 bg-success/5' : ''}`}>
              {editingId === v.id ? (
                <div className="space-y-4">
                  <Textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="min-h-[100px]"
                    placeholder="Ex.: João 3:16 — Porque Deus amou o mundo..."
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={cancelEdit}>
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button size="sm" onClick={() => saveEdit(v.id)}>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold mb-2">{v.text}</p>
                    <Badge variant="outline">{v.memorized ? 'Memorizado' : 'Para memorizar'}</Badge>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => startEdit(v)} title="Editar">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteVerse(v.id)} title="Remover">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <Button 
                      variant={v.memorized ? 'success' : 'default'} 
                      disabled={v.memorized} 
                      onClick={() => markMemorized(v.id)}
                      className="ml-2"
                    >
                      {v.memorized ? (<><CheckCircle2 className="w-4 h-4 mr-2"/> Feito</>) : 'Memorizado'}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Verses;