// Enhanced quiz generator based on daily readings

import { McCheyneReading } from './mccheyneReadingPlan';

export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // index of correct answer
  explanation: string;
}

// Bible knowledge questions organized by book
const bibleKnowledge: Record<string, QuizQuestion[]> = {
  'Gênesis': [
    {
      question: 'Quem foi o primeiro homem criado por Deus?',
      options: ['Noé', 'Adão', 'Abraão', 'Moisés'],
      correct: 1,
      explanation: 'Adão foi o primeiro homem criado por Deus do pó da terra.'
    },
    {
      question: 'Quantos dias Deus levou para criar o mundo?',
      options: ['5 dias', '6 dias', '7 dias', '8 dias'],
      correct: 1,
      explanation: 'Deus criou o mundo em 6 dias e descansou no sétimo.'
    },
    {
      question: 'Quem construiu a arca?',
      options: ['Abraão', 'Moisés', 'Noé', 'José'],
      correct: 2,
      explanation: 'Noé construiu a arca seguindo as instruções de Deus.'
    }
  ],
  'Êxodo': [
    {
      question: 'Quem liderou o povo de Israel para fora do Egito?',
      options: ['Josué', 'Moisés', 'Arão', 'Davi'],
      correct: 1,
      explanation: 'Moisés foi escolhido por Deus para libertar Israel da escravidão.'
    },
    {
      question: 'Quantas pragas Deus enviou ao Egito?',
      options: ['7 pragas', '10 pragas', '12 pragas', '5 pragas'],
      correct: 1,
      explanation: 'Deus enviou 10 pragas ao Egito antes de Faraó libertar o povo.'
    }
  ],
  'Mateus': [
    {
      question: 'Onde Jesus nasceu?',
      options: ['Jerusalém', 'Nazaré', 'Belém', 'Cafarnaum'],
      correct: 2,
      explanation: 'Jesus nasceu em Belém, cumprindo a profecia.'
    },
    {
      question: 'Quantos discípulos Jesus escolheu?',
      options: ['10', '12', '7', '24'],
      correct: 1,
      explanation: 'Jesus escolheu 12 discípulos para segui-Lo.'
    }
  ],
  'Salmos': [
    {
      question: 'Quem escreveu a maioria dos Salmos?',
      options: ['Salomão', 'Davi', 'Moisés', 'Samuel'],
      correct: 1,
      explanation: 'O rei Davi escreveu a maioria dos Salmos.'
    }
  ],
  'João': [
    {
      question: 'Qual é o versículo mais famoso da Bíblia em João?',
      options: ['João 1:1', 'João 3:16', 'João 14:6', 'João 21:25'],
      correct: 1,
      explanation: 'João 3:16 é conhecido como o versículo de ouro da Bíblia.'
    }
  ],
  'Romanos': [
    {
      question: 'Quem escreveu a carta aos Romanos?',
      options: ['Pedro', 'Paulo', 'João', 'Tiago'],
      correct: 1,
      explanation: 'Paulo escreveu a carta aos Romanos.'
    }
  ]
};

// Generic theological questions
const theologicalQuestions: QuizQuestion[] = [
  {
    question: 'A Bíblia é dividida em quantos testamentos?',
    options: ['1', '2', '3', '4'],
    correct: 1,
    explanation: 'A Bíblia é dividida em Antigo e Novo Testamento.'
  },
  {
    question: 'Qual é o maior mandamento segundo Jesus?',
    options: ['Não roubar', 'Amar a Deus sobre todas as coisas', 'Guardar o sábado', 'Honrar pai e mãe'],
    correct: 1,
    explanation: 'Jesus disse que o maior mandamento é amar a Deus de todo coração.'
  },
  {
    question: 'Quantos livros há na Bíblia?',
    options: ['66', '73', '39', '27'],
    correct: 0,
    explanation: 'A Bíblia protestante contém 66 livros (39 AT + 27 NT).'
  },
  {
    question: 'O que significa "Evangelho"?',
    options: ['Lei de Deus', 'Boa Nova', 'Livro Sagrado', 'Profecia'],
    correct: 1,
    explanation: 'Evangelho significa "Boa Nova" ou "Boas Notícias".'
  },
  {
    question: 'Qual foi o primeiro milagre de Jesus?',
    options: ['Curar um cego', 'Ressuscitar Lázaro', 'Transformar água em vinho', 'Alimentar 5 mil'],
    correct: 2,
    explanation: 'O primeiro milagre foi transformar água em vinho nas bodas de Caná.'
  }
];

// Generate quiz based on today's reading
export const generateQuiz = (reading: McCheyneReading): QuizQuestion[] => {
  const questions: QuizQuestion[] = [];
  
  // Extract book names from readings
  const books = [
    reading.familyOT.split(' ')[0],
    reading.familyNT.split(' ')[0],
    reading.personalOT.split(' ')[0],
    reading.personalNT.split(' ')[0]
  ];
  
  // Get book-specific questions
  books.forEach(book => {
    if (bibleKnowledge[book] && bibleKnowledge[book].length > 0) {
      const bookQuestions = bibleKnowledge[book];
      const randomQ = bookQuestions[Math.floor(Math.random() * bookQuestions.length)];
      questions.push(randomQ);
    }
  });
  
  // Add theological questions to reach 5 total
  while (questions.length < 5) {
    const randomQ = theologicalQuestions[Math.floor(Math.random() * theologicalQuestions.length)];
    // Avoid duplicates
    if (!questions.find(q => q.question === randomQ.question)) {
      questions.push(randomQ);
    }
  }
  
  // Reading comprehension question about today's chapters
  questions.push({
    question: `Hoje você leu ${reading.familyOT}, ${reading.familyNT}, ${reading.personalOT} e ${reading.personalNT}. Quantos capítulos você leu no total?`,
    options: ['2 capítulos', '3 capítulos', '4 capítulos', '5 capítulos'],
    correct: 2,
    explanation: 'O Plano M\'Cheyne inclui 4 capítulos por dia: 2 familiares e 2 pessoais.'
  });
  
  return questions.slice(0, 6); // Return 6 questions
};
