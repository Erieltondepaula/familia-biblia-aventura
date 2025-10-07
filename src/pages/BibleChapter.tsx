import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChapter } from '@/lib/bibleData';
import BibleReader from '@/components/BibleReader';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BibleChapter = () => {
  const { book, chapter } = useParams();
  const navigate = useNavigate();

  const chapterData = book && chapter ? getChapter(book, parseInt(chapter)) : null;

  useEffect(() => {
    document.title = chapterData 
      ? `${chapterData.book} ${chapterData.chapter} - Bíblia 365`
      : 'Bíblia 365';
  }, [chapterData]);

  if (!chapterData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Capítulo não encontrado</h2>
          <p className="text-muted-foreground mb-6">
            O capítulo solicitado ainda não está disponível.
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
