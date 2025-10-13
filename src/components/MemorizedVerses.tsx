import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Star } from "lucide-react";
import { useProfile } from "@/hooks/useProfile"; // <-- CORREÇÃO APLICADA AQUI
import { useState, useEffect } from "react";

interface Verse {
  id: string;
  text: string;
  memorized: boolean;
}

const MemorizedVerses = () => {
  const { currentProfile } = useProfile();
  const key = `verses_${currentProfile?.id || 'default'}`;
  const [verses, setVerses] = useState<Verse[]>([]);

  useEffect(() => {
    // Apenas carrega os versos se houver um perfil ativo
    if (currentProfile) {
      const saved = localStorage.getItem(key);
      setVerses(saved ? JSON.parse(saved) : []);
    } else {
      setVerses([]); // Limpa os versos se não houver perfil
    }
  }, [key, currentProfile]);

  const memorizedVerses = verses.filter(v => v.memorized);

  if (memorizedVerses.length === 0) {
    return null; // Não renderiza nada se não houver versos memorizados
  }

  return (
    <Card className="p-6 shadow-card">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Star className="w-6 h-6 text-accent" />
        Versículos Memorizados
      </h3>
      <div className="space-y-3">
        {memorizedVerses.slice(0, 3).map(verse => (
          <div key={verse.id} className="p-4 bg-gradient-glory/10 rounded-lg border border-accent/20">
            <p className="text-sm font-semibold text-foreground/90 line-clamp-2">
              {verse.text}
            </p>
          </div>
        ))}
        {memorizedVerses.length > 3 && (
          <Badge variant="outline" className="w-full justify-center">
            +{memorizedVerses.length - 3} versículos
          </Badge>
        )}
      </div>
    </Card>
  );
};

export default MemorizedVerses;