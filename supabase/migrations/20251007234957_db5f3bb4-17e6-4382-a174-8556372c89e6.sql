-- Criar tabela de livros da Bíblia
CREATE TABLE public.bible_books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_key text UNIQUE NOT NULL,
  book_name text NOT NULL,
  testament text NOT NULL CHECK (testament IN ('AT', 'NT')),
  book_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de capítulos
CREATE TABLE public.bible_chapters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES public.bible_books(id) ON DELETE CASCADE NOT NULL,
  chapter_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(book_id, chapter_number)
);

-- Criar tabela de versículos
CREATE TABLE public.bible_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id uuid REFERENCES public.bible_chapters(id) ON DELETE CASCADE NOT NULL,
  verse_number integer NOT NULL,
  text text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(chapter_id, verse_number)
);

-- Habilitar RLS (acesso público para leitura)
ALTER TABLE public.bible_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bible_chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bible_verses ENABLE ROW LEVEL SECURITY;

-- Políticas de leitura pública
CREATE POLICY "Qualquer um pode ler livros"
  ON public.bible_books FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Qualquer um pode ler capítulos"
  ON public.bible_chapters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Qualquer um pode ler versículos"
  ON public.bible_verses FOR SELECT
  TO public
  USING (true);

-- Criar índices para performance
CREATE INDEX idx_chapters_book ON public.bible_chapters(book_id);
CREATE INDEX idx_verses_chapter ON public.bible_verses(chapter_id);
CREATE INDEX idx_books_key ON public.bible_books(book_key);

-- Inserir os 66 livros da Bíblia (Antigo Testamento)
INSERT INTO public.bible_books (book_key, book_name, testament, book_order) VALUES
  ('Genesis', 'Gênesis', 'AT', 1),
  ('Exodus', 'Êxodo', 'AT', 2),
  ('Leviticus', 'Levítico', 'AT', 3),
  ('Numbers', 'Números', 'AT', 4),
  ('Deuteronomy', 'Deuteronômio', 'AT', 5),
  ('Joshua', 'Josué', 'AT', 6),
  ('Judges', 'Juízes', 'AT', 7),
  ('Ruth', 'Rute', 'AT', 8),
  ('1Samuel', '1 Samuel', 'AT', 9),
  ('2Samuel', '2 Samuel', 'AT', 10),
  ('1Kings', '1 Reis', 'AT', 11),
  ('2Kings', '2 Reis', 'AT', 12),
  ('1Chronicles', '1 Crônicas', 'AT', 13),
  ('2Chronicles', '2 Crônicas', 'AT', 14),
  ('Ezra', 'Esdras', 'AT', 15),
  ('Nehemiah', 'Neemias', 'AT', 16),
  ('Esther', 'Ester', 'AT', 17),
  ('Job', 'Jó', 'AT', 18),
  ('Psalms', 'Salmos', 'AT', 19),
  ('Proverbs', 'Provérbios', 'AT', 20),
  ('Ecclesiastes', 'Eclesiastes', 'AT', 21),
  ('SongOfSolomon', 'Cântico dos Cânticos', 'AT', 22),
  ('Isaiah', 'Isaías', 'AT', 23),
  ('Jeremiah', 'Jeremias', 'AT', 24),
  ('Lamentations', 'Lamentações', 'AT', 25),
  ('Ezekiel', 'Ezequiel', 'AT', 26),
  ('Daniel', 'Daniel', 'AT', 27),
  ('Hosea', 'Oséias', 'AT', 28),
  ('Joel', 'Joel', 'AT', 29),
  ('Amos', 'Amós', 'AT', 30),
  ('Obadiah', 'Obadias', 'AT', 31),
  ('Jonah', 'Jonas', 'AT', 32),
  ('Micah', 'Miquéias', 'AT', 33),
  ('Nahum', 'Naum', 'AT', 34),
  ('Habakkuk', 'Habacuque', 'AT', 35),
  ('Zephaniah', 'Sofonias', 'AT', 36),
  ('Haggai', 'Ageu', 'AT', 37),
  ('Zechariah', 'Zacarias', 'AT', 38),
  ('Malachi', 'Malaquias', 'AT', 39),
  ('Matthew', 'Mateus', 'NT', 40),
  ('Mark', 'Marcos', 'NT', 41),
  ('Luke', 'Lucas', 'NT', 42),
  ('John', 'João', 'NT', 43),
  ('Acts', 'Atos', 'NT', 44),
  ('Romans', 'Romanos', 'NT', 45),
  ('1Corinthians', '1 Coríntios', 'NT', 46),
  ('2Corinthians', '2 Coríntios', 'NT', 47),
  ('Galatians', 'Gálatas', 'NT', 48),
  ('Ephesians', 'Efésios', 'NT', 49),
  ('Philippians', 'Filipenses', 'NT', 50),
  ('Colossians', 'Colossenses', 'NT', 51),
  ('1Thessalonians', '1 Tessalonicenses', 'NT', 52),
  ('2Thessalonians', '2 Tessalonicenses', 'NT', 53),
  ('1Timothy', '1 Timóteo', 'NT', 54),
  ('2Timothy', '2 Timóteo', 'NT', 55),
  ('Titus', 'Tito', 'NT', 56),
  ('Philemon', 'Filemom', 'NT', 57),
  ('Hebrews', 'Hebreus', 'NT', 58),
  ('James', 'Tiago', 'NT', 59),
  ('1Peter', '1 Pedro', 'NT', 60),
  ('2Peter', '2 Pedro', 'NT', 61),
  ('1John', '1 João', 'NT', 62),
  ('2John', '2 João', 'NT', 63),
  ('3John', '3 João', 'NT', 64),
  ('Jude', 'Judas', 'NT', 65),
  ('Revelation', 'Apocalipse', 'NT', 66);