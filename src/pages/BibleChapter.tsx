import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBibleChapter } from '@/lib/bibleDatabase';
import { BibleChapter as BibleChapterType } from '@/lib/bibleData';
import BibleReader from '@/components/BibleReader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertCircle } from 'lucide-react';

const BibleChapter = () => {
  const { book, chapter } = useParams();
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState<BibleChapterType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChapter = async () => {
      if (!book || !chapter) {
        setError('Parâmetros inválidos');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getBibleChapter(book, parseInt(chapter));
        
        if (!data) {
          setError('Capítulo não encontrado no banco de dados.');
          setChapterData(null);
        } else {
          // Converter para o formato esperado pelo BibleReader
          const formattedData: BibleChapterType = {
            book: data.book.book_name,
            chapter: data.chapter.chapter_number,
            verses: data.verses.map(v => ({
              number: v.verse_number,
              text: v.text
            }))
          };
          setChapterData(formattedData);
        }
      } catch (err) {
        console.error('Erro ao carregar capítulo:', err);
        setError('Erro ao carregar capítulo. Tente novamente.');
      }
      
      setLoading(false);
    };

    loadChapter();
  }, [book, chapter]);

  useEffect(() => {
    document.title = chapterData 
      ? `${chapterData.book} ${chapterData.chapter} - Bíblia 365`
      : 'Bíblia 365';
  }, [chapterData]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          <Skeleton className="h-10 w-32" />
          <Card className="p-8 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="space-y-3 mt-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !chapterData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto">
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || 'Capítulo não encontrado'}
            </AlertDescription>
          </Alert>
          <p className="text-muted-foreground mb-6">
            Este capítulo ainda não foi carregado no banco de dados. 
            Estamos trabalhando para adicionar todo o conteúdo da Bíblia em breve.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar
        </Button>
      </div>

      <BibleReader chapter={chapterData} />
    </div>
  );
};

export default BibleChapter;
