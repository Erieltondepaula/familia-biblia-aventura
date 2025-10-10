import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useProfile } from '@/hooks/useProfile';
import { BibleChapter } from '@/lib/bibleData';
import { 
  HighlightColor, 
  HighlightStyle, 
  VerseHighlight, // <-- 1. IMPORT THE CORRECT TYPE
  saveHighlight, 
  getHighlight, 
  removeHighlight 
} from '@/lib/bibleHighlightStorage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bold, 
  Underline, 
  Highlighter, 
  Eraser,
  StickyNote
} from 'lucide-react';
import { toast } from 'sonner';

interface BibleReaderProps {
  chapter: BibleChapter;
}

const BibleReader = ({ chapter }: BibleReaderProps) => {
  const { currentProfile } = useProfile();
  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<HighlightColor>('yellow');
  const [note, setNote] = useState('');
  // 2. USE THE 'VerseHighlight' TYPE INSTEAD OF 'any'
  const [verseHighlights, setVerseHighlights] = useState<Record<number, Partial<VerseHighlight>>>({});

  useEffect(() => {
    if (!currentProfile) return;
    
    // 3. USE THE 'VerseHighlight' TYPE HERE AS WELL
    const highlights: Record<number, Partial<VerseHighlight>> = {};
    chapter.verses.forEach(verse => {
      const highlight = getHighlight(
        currentProfile.id,
        chapter.book,
        chapter.chapter,
        verse.number
      );
      if (highlight) {
        highlights[verse.number] = highlight;
      }
    });
    setVerseHighlights(highlights);
  }, [currentProfile, chapter]);

  const handleVerseClick = (verseNumber: number) => {
    setSelectedVerse(verseNumber);
    const highlight = verseHighlights[verseNumber];
    if (highlight) {
      setNote(highlight.note || '');
      if (highlight.color) setSelectedColor(highlight.color);
    } else {
      setNote('');
    }
  };

  const applyHighlight = (color: HighlightColor) => {
    if (!selectedVerse || !currentProfile) return;
    
    const newHighlight: VerseHighlight = {
      ...(verseHighlights[selectedVerse] || {}),
      profileId: currentProfile.id,
      book: chapter.book,
      chapter: chapter.chapter,
      verse: selectedVerse,
      color,
      note: note || undefined
    };
    saveHighlight(newHighlight);

    setVerseHighlights(prev => ({
      ...prev,
      [selectedVerse]: newHighlight
    }));

    toast.success('Marcação aplicada!');
  };

  const applyStyle = (style: HighlightStyle) => {
    if (!selectedVerse || !currentProfile) return;
    
    const newHighlight: VerseHighlight = {
      ...(verseHighlights[selectedVerse] || {}),
      profileId: currentProfile.id,
      book: chapter.book,
      chapter: chapter.chapter,
      verse: selectedVerse,
      style,
      note: note || undefined
    };
    saveHighlight(newHighlight);

    setVerseHighlights(prev => ({
      ...prev,
      [selectedVerse]: newHighlight
    }));

    toast.success('Estilo aplicado!');
  };

  const clearHighlight = () => {
    if (!selectedVerse || !currentProfile) return;
    
    removeHighlight(currentProfile.id, chapter.book, chapter.chapter, selectedVerse);
    
    setVerseHighlights(prev => {
      const updated = { ...prev };
      delete updated[selectedVerse];
      return updated;
    });
    
    setNote('');
    toast.success('Marcação removida!');
  };

  const saveNote = () => {
    if (!selectedVerse || !currentProfile) return;
    
    const newHighlight: VerseHighlight = {
      ...(verseHighlights[selectedVerse] || {}),
      profileId: currentProfile.id,
      book: chapter.book,
      chapter: chapter.chapter,
      verse: selectedVerse,
      note
    };
    saveHighlight(newHighlight);

    setVerseHighlights(prev => ({
      ...prev,
      [selectedVerse]: newHighlight
    }));

    toast.success('Anotação salva!');
  };

  const getVerseClassName = (verseNumber: number) => {
    const highlight = verseHighlights[verseNumber];
    if (!highlight) return 'cursor-pointer hover:bg-muted/30 transition-colors p-2 rounded';
    
    let className = 'cursor-pointer p-2 rounded transition-colors ';
    
    if (highlight.color === 'yellow') className += 'bg-yellow-200/60 dark:bg-yellow-900/40 ';
    if (highlight.color === 'green') className += 'bg-green-200/60 dark:bg-green-900/40 ';
    if (highlight.color === 'red') className += 'bg-red-200/60 dark:bg-red-900/40 ';
    if (highlight.color === 'blue') className += 'bg-blue-200/60 dark:bg-blue-900/40 ';
    if (highlight.color === 'purple') className += 'bg-purple-200/60 dark:bg-purple-900/40 ';
    
    if (highlight.style === 'bold') className += 'font-bold ';
    if (highlight.style === 'underline') className += 'underline decoration-2 ';
    
    if (selectedVerse === verseNumber) {
      className += 'ring-2 ring-primary ';
    }
    
    return className;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {chapter.book} {chapter.chapter}
            </h1>
          </div>
          
          <div className="space-y-3">
            {chapter.verses.map((verse) => (
              <div
                key={verse.number}
                onClick={() => handleVerseClick(verse.number)}
                className={getVerseClassName(verse.number)}
              >
                <span className="font-semibold text-primary mr-2">
                  {verse.number}
                </span>
                <span className="text-foreground">{verse.text}</span>
                {verseHighlights[verse.number]?.note && (
                  <StickyNote className="inline-block ml-2 w-4 h-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-6">
          <h3 className="text-lg font-semibold mb-4">
            Ferramentas de Marcação
          </h3>
          
          {selectedVerse ? (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Versículo selecionado: {selectedVerse}
                </p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Cores</p>
                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-yellow-300 hover:bg-yellow-400" onClick={() => applyHighlight('yellow')} />
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-green-300 hover:bg-green-400" onClick={() => applyHighlight('green')} />
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-red-300 hover:bg-red-400" onClick={() => applyHighlight('red')} />
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-blue-300 hover:bg-blue-400" onClick={() => applyHighlight('blue')} />
                  <Button size="sm" variant="outline" className="w-10 h-10 p-0 bg-purple-300 hover:bg-purple-400" onClick={() => applyHighlight('purple')} />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Estilos</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => applyStyle('bold')}>
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => applyStyle('underline')}>
                    <Underline className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Anotação</p>
                <Textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Adicione uma anotação..."
                  className="min-h-[100px]"
                />
                <Button size="sm" className="w-full mt-2" onClick={saveNote}>
                  Salvar Anotação
                </Button>
              </div>

              <Button size="sm" variant="destructive" className="w-full" onClick={clearHighlight}>
                <Eraser className="w-4 h-4 mr-2" />
                Limpar Marcações
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Clique em um versículo para começar a marcar
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default BibleReader;