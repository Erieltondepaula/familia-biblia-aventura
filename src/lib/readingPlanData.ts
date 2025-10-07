// Sample reading plan data for the first days
export interface DailyReading {
  day: number;
  date: string;
  chapters: string[];
  devotional: string;
  reflection: string;
  keyVerse: string;
  book: string;
}

export const readingPlan: DailyReading[] = [
  {
    day: 1,
    date: "2025-01-01",
    book: "Gênesis",
    chapters: ["Gênesis 1", "Gênesis 2"],
    devotional: "No princípio, Deus criou os céus e a terra. Que privilégio começar nossa jornada pelo início de tudo! Deus, em Sua soberania e sabedoria infinita, trouxe ordem ao caos e luz às trevas. Da mesma forma, Ele deseja trazer ordem e luz à nossa vida diária.",
    reflection: "Como você pode permitir que Deus traga mais ordem e luz em áreas caóticas da sua vida hoje?",
    keyVerse: "No princípio criou Deus os céus e a terra. - Gênesis 1:1"
  },
  {
    day: 2,
    date: "2025-01-02",
    book: "Gênesis",
    chapters: ["Gênesis 3", "Gênesis 4"],
    devotional: "A queda do homem nos lembra da seriedade do pecado, mas também da promessa de redenção. Mesmo em meio à desobediência, Deus prometeu um Salvador. Isso nos mostra que Deus sempre tem um plano de restauração.",
    reflection: "Onde você precisa da restauração de Deus hoje? Como pode buscar Sua graça?",
    keyVerse: "E porei inimizade entre ti e a mulher, e entre a tua semente e a sua semente; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar. - Gênesis 3:15"
  },
  {
    day: 3,
    date: "2025-01-03",
    book: "Gênesis",
    chapters: ["Gênesis 5", "Gênesis 6"],
    devotional: "Noé achou graça aos olhos do Senhor. Em meio a uma geração corrupta, ele escolheu andar com Deus. Sua obediência, mesmo quando não fazia sentido construir uma arca longe do mar, salvou sua família.",
    reflection: "Você está disposto a obedecer a Deus mesmo quando Suas instruções parecem não fazer sentido?",
    keyVerse: "Porém Noé achou graça aos olhos do SENHOR. - Gênesis 6:8"
  },
  {
    day: 4,
    date: "2025-01-04",
    book: "Gênesis",
    chapters: ["Gênesis 7", "Gênesis 8"],
    devotional: "Deus se lembrou de Noé. Mesmo durante a tempestade e o dilúvio, Deus não esqueceu dele. Da mesma forma, nas tempestades da vida, Deus não se esquece de nós.",
    reflection: "Quais 'tempestades' você está enfrentando onde precisa confiar que Deus se lembrará de você?",
    keyVerse: "E lembrou-se Deus de Noé... - Gênesis 8:1"
  },
  {
    day: 5,
    date: "2025-01-05",
    book: "Gênesis",
    chapters: ["Gênesis 9", "Gênesis 10", "Gênesis 11"],
    devotional: "A aliança do arco-íris mostra a fidelidade de Deus. Cada vez que vemos um arco-íris, somos lembrados de que Deus mantém Suas promessas. Ele é fiel mesmo quando somos infiéis.",
    reflection: "Quais promessas de Deus você precisa lembrar hoje?",
    keyVerse: "O meu arco tenho posto nas nuvens; este será por sinal da aliança entre mim e a terra. - Gênesis 9:13"
  }
];

// Get or set the plan start date
export const getPlanStartDate = (): Date => {
  const saved = localStorage.getItem('planStartDate');
  if (saved) {
    return new Date(saved);
  }
  // Default to today if not set
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  localStorage.setItem('planStartDate', today.toISOString());
  return today;
};

export const setPlanStartDate = (date: Date): void => {
  date.setHours(0, 0, 0, 0);
  localStorage.setItem('planStartDate', date.toISOString());
};

// Calculate current day based on start date
export const getCurrentDayNumber = (): number => {
  const startDate = getPlanStartDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Day 1 is the start date, so add 1
  const dayNumber = diffDays + 1;
  
  // Clamp between 1 and total days
  return Math.max(1, Math.min(dayNumber, readingPlan.length));
};

export const getCurrentDayReading = (): DailyReading => {
  const dayNumber = getCurrentDayNumber();
  return getReadingByDay(dayNumber) || readingPlan[0];
};

export const getReadingByDay = (day: number): DailyReading | undefined => {
  return readingPlan.find(r => r.day === day);
};
