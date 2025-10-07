import { supabase } from '@/integrations/supabase/client';

export interface BibleVerse {
  id: string;
  verse_number: number;
  text: string;
}

export interface BibleChapter {
  id: string;
  chapter_number: number;
  book_id: string;
  verses?: BibleVerse[];
}

export interface BibleBook {
  id: string;
  book_key: string;
  book_name: string;
  testament: 'AT' | 'NT';
  book_order: number;
}

// Buscar livro por chave
export const getBibleBook = async (bookKey: string): Promise<BibleBook | null> => {
  const { data, error } = await supabase
    .from('bible_books')
    .select('*')
    .eq('book_key', bookKey)
    .maybeSingle();

  if (error) {
    console.error('Erro ao buscar livro:', error);
    return null;
  }

  if (!data) return null;

  return data as BibleBook;
};

// Buscar capítulo com versículos
export const getBibleChapter = async (
  bookKey: string,
  chapterNumber: number
): Promise<{ book: BibleBook; chapter: BibleChapter; verses: BibleVerse[] } | null> => {
  // Buscar o livro
  const book = await getBibleBook(bookKey);
  if (!book) return null;

  // Buscar o capítulo
  const { data: chapterData, error: chapterError } = await supabase
    .from('bible_chapters')
    .select('*')
    .eq('book_id', book.id)
    .eq('chapter_number', chapterNumber)
    .maybeSingle();

  if (chapterError || !chapterData) {
    console.error('Erro ao buscar capítulo:', chapterError);
    return null;
  }

  // Buscar os versículos
  const { data: versesData, error: versesError } = await supabase
    .from('bible_verses')
    .select('*')
    .eq('chapter_id', chapterData.id)
    .order('verse_number', { ascending: true });

  if (versesError) {
    console.error('Erro ao buscar versículos:', versesError);
    return null;
  }

  return {
    book,
    chapter: chapterData,
    verses: versesData || []
  };
};

// Verificar se um capítulo existe no banco
export const chapterExistsInDatabase = async (
  bookKey: string,
  chapterNumber: number
): Promise<boolean> => {
  const book = await getBibleBook(bookKey);
  if (!book) return false;

  const { data, error } = await supabase
    .from('bible_chapters')
    .select('id')
    .eq('book_id', book.id)
    .eq('chapter_number', chapterNumber)
    .single();

  return !error && !!data;
};

// Buscar todos os livros
export const getAllBibleBooks = async (): Promise<BibleBook[]> => {
  const { data, error } = await supabase
    .from('bible_books')
    .select('*')
    .order('book_order', { ascending: true });

  if (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }

  return (data || []) as BibleBook[];
};
