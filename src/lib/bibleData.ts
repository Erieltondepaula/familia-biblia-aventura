// Bible verse and chapter data structure
import { supabase } from '@/integrations/supabase/client';

export interface BibleVerse {
  number: number;
  text: string;
}

export interface BibleChapter {
  book: string;
  chapter: number;
  verses: BibleVerse[];
}

// Book name mapping for M'Cheyne plan
export const bookNameMap: Record<string, string> = {
  'Gênesis': 'Genesis',
  'Êxodo': 'Exodus',
  'Levítico': 'Leviticus',
  'Números': 'Numbers',
  'Deuteronômio': 'Deuteronomy',
  'Josué': 'Joshua',
  'Juízes': 'Judges',
  'Rute': 'Ruth',
  '1 Samuel': '1Samuel',
  '2 Samuel': '2Samuel',
  '1 Reis': '1Kings',
  '2 Reis': '2Kings',
  '1 Crônicas': '1Chronicles',
  '2 Crônicas': '2Chronicles',
  'Esdras': 'Ezra',
  'Neemias': 'Nehemiah',
  'Ester': 'Esther',
  'Jó': 'Job',
  'Salmos': 'Psalms',
  'Provérbios': 'Proverbs',
  'Eclesiastes': 'Ecclesiastes',
  'Cantares': 'SongOfSolomon',
  'Isaías': 'Isaiah',
  'Jeremias': 'Jeremiah',
  'Lamentações': 'Lamentations',
  'Ezequiel': 'Ezekiel',
  'Daniel': 'Daniel',
  'Oseias': 'Hosea',
  'Joel': 'Joel',
  'Amós': 'Amos',
  'Obadias': 'Obadiah',
  'Jonas': 'Jonah',
  'Miqueias': 'Micah',
  'Naum': 'Nahum',
  'Habacuque': 'Habakkuk',
  'Sofonias': 'Zephaniah',
  'Ageu': 'Haggai',
  'Zacarias': 'Zechariah',
  'Malaquias': 'Malachi',
  'Mateus': 'Matthew',
  'Marcos': 'Mark',
  'Lucas': 'Luke',
  'João': 'John',
  'Atos': 'Acts',
  'Romanos': 'Romans',
  '1 Coríntios': '1Corinthians',
  '2 Coríntios': '2Corinthians',
  'Gálatas': 'Galatians',
  'Efésios': 'Ephesians',
  'Filipenses': 'Philippians',
  'Colossenses': 'Colossians',
  '1 Tessalonicenses': '1Thessalonians',
  '2 Tessalonicenses': '2Thessalonians',
  '1 Timóteo': '1Timothy',
  '2 Timóteo': '2Timothy',
  'Tito': 'Titus',
  'Filemon': 'Philemon',
  'Hebreus': 'Hebrews',
  'Tiago': 'James',
  '1 Pedro': '1Peter',
  '2 Pedro': '2Peter',
  '1 João': '1John',
  '2 João': '2John',
  '3 João': '3John',
  'Judas': 'Jude',
  'Apocalipse': 'Revelation'
};

// Sample data - starting with Genesis and expanding
export const bibleChapters: Record<string, BibleChapter> = {
  "Genesis-1": {
    book: "Gênesis",
    chapter: 1,
    verses: [
      { number: 1, text: "No princípio criou Deus o céu e a terra." },
      { number: 2, text: "E a terra era sem forma e vazia; e havia trevas sobre a face do abismo. E o espírito de Deus se movia sobre a face das águas." },
      { number: 3, text: "E disse Deus: Haja luz; e houve luz." },
      { number: 4, text: "E viu Deus a luz, que isto era bom; e Deus separou a luz das trevas." },
      { number: 5, text: "E chamou Deus à luz Dia, e às trevas ele chamou Noite. E houve a tarde e a manhã, o primeiro dia." },
      { number: 6, text: "E disse Deus: Haja um firmamento no meio das águas, e deixe que separe as águas das águas." },
      { number: 7, text: "E fez Deus o firmamento, e separou as águas que estavam debaixo do firmamento das águas que estavam acima do firmamento. E assim foi." },
      { number: 8, text: "E Deus chamou ao firmamento Céu. E houve a tarde e a manhã, o segundo dia." },
      { number: 9, text: "E disse Deus: Ajuntem-se as águas sob o céu em um lugar, e apareça a terra seca. E assim foi." },
      { number: 10, text: "E chamou Deus à terra seca Terra; e ao ajuntamento das águas ele chamou Mares. E Deus viu que isto era bom." },
      { number: 11, text: "E disse Deus: Deixe a terra trazer a relva, a erva produzindo semente, e a árvore frutífera produzindo fruto segundo a sua espécie; cuja semente esteja em si mesma, sobre a terra. E assim foi." },
      { number: 12, text: "E a terra produziu relva, e erva produzindo semente segundo a sua espécie, e a árvore produzindo fruto, cuja semente estava em si mesma, segundo a sua espécie. E Deus viu que isto era bom." },
      { number: 13, text: "E houve a tarde e a manhã, o terceiro dia." },
      { number: 14, text: "E disse Deus: Haja luminares no firmamento do céu para separar o dia da noite; e deixe que sejam para sinais, e para estações, e para dias, e anos;" },
      { number: 15, text: "e deixe que sejam para luminares no firmamento do céu para dar luz sobre a terra. E assim foi." },
      { number: 16, text: "E Deus fez dois grandes luminares: o luminar maior para governar o dia, e o luminar menor para governar a noite. Ele fez também as estrelas." },
      { number: 17, text: "E Deus os colocou no firmamento do céu para dar luz sobre a terra," },
      { number: 18, text: "e para governar sobre o dia e sobre a noite, e para separar a luz das trevas. E Deus viu que isto era bom." },
      { number: 19, text: "E houve a tarde e a manhã, o quarto dia." },
      { number: 20, text: "E disse Deus: Deixe as águas produzirem abundantemente a criatura que se move, que tem vida, e aves que possam voar acima da terra no firmamento aberto do céu." },
      { number: 21, text: "E Deus criou grandes baleias, e toda criatura vivente que se move, as quais as águas produziram abundantemente, segundo a sua espécie, e toda ave alada segundo a sua espécie. E Deus viu que isto era bom." },
      { number: 22, text: "E Deus os abençoou, dizendo: Sede frutíferos, e multiplicai-vos, e enchei as águas nos mares, e deixe as aves se multiplicarem na terra." },
      { number: 23, text: "E houve a tarde e a manhã, o quinto dia." },
      { number: 24, text: "E disse Deus: Deixe a terra produzir a criatura vivente segundo a sua espécie, gado, e coisa rastejante, e animal da terra segundo a sua espécie. E assim foi." },
      { number: 25, text: "E Deus fez o animal da terra segundo a sua espécie, e o gado segundo a sua espécie, e toda coisa que rasteja sobre a terra segundo a sua espécie. E Deus viu que isto era bom." },
      { number: 26, text: "E disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; e deixe que tenha domínio sobre os peixes do mar, e sobre as aves do céu, e sobre o gado, e sobre toda a terra, e sobre toda coisa rastejante que rasteja sobre a terra." },
      { number: 27, text: "Assim Deus criou o homem à sua própria imagem, à imagem de Deus o criou; macho e fêmea os criou." },
      { number: 28, text: "E Deus os abençoou, e Deus lhes disse: Sede frutíferos, e multiplicai-vos, e enchei a terra, e sujeitai-a; e tenha domínio sobre os peixes do mar, e sobre as aves do céu, e sobre toda coisa vivente que se move sobre a terra." },
      { number: 29, text: "E disse Deus: Eis que eu vos tenho dado toda erva produzindo semente, que está sobre a face de toda a terra, e toda árvore, na qual está o fruto de uma árvore produzindo semente; para vós será para alimento." },
      { number: 30, text: "E a todo animal da terra, e a toda ave do céu, e a cada coisa que rasteja sobre a terra, em que há vida, eu tenho dado toda erva verde para alimento. E assim foi." },
      { number: 31, text: "E Deus viu todas as coisas que ele havia feito; e eis que era muito bom. E houve a tarde e a manhã, o sexto dia." }
    ]
  }
};

export const getChapter = (book: string, chapter: number): BibleChapter | null => {
  const key = `${book}-${chapter}`;
  return bibleChapters[key] || null;
};

export const parseChapterReference = (reference: string): { book: string; chapter: number } | null => {
  // Parse references like "Genesis 1", "1 Samuel 10", "Psalm 119"
  const match = reference.match(/^(.+?)\s+(\d+)$/);
  if (!match) return null;
  
  const book = match[1].trim();
  const chapter = parseInt(match[2]);
  
  return { book, chapter };
};

export const isChapterAvailable = async (bookKey: string, chapterNum: number): Promise<boolean> => {
  try {
    const { data: book } = await supabase
      .from('bible_books')
      .select('id')
      .eq('book_key', bookKey)
      .single();
    
    if (!book) return false;

    const { data: chapter } = await supabase
      .from('bible_chapters')
      .select('id')
      .eq('book_id', book.id)
      .eq('chapter_number', chapterNum)
      .single();

    return !!chapter;
  } catch {
    return false;
  }
};
