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
    devotional: "No princípio criou Deus. Que palavras gloriosas! Aqui está a base de toda a nossa fé. Antes que houvesse luz, montanhas, oceanos ou humanidade, Deus já existia em Sua eterna majestade. Ele não precisou de matéria-prima, não consultou arquiteto, não convocou ajudantes. Pela Sua palavra trouxe tudo à existência. Que consolo saber que este mesmo Deus governa nossa vida! Se Ele criou os mundos do nada, certamente pode transformar nosso vazio em plenitude, nossas trevas em luz.",
    reflection: "Se Deus é poderoso o suficiente para criar o universo com Sua palavra, que situação impossível em sua vida você precisa confiar a Ele hoje?",
    keyVerse: "No princípio criou Deus os céus e a terra. - Gênesis 1:1"
  },
  {
    day: 2,
    date: "2025-01-02",
    book: "Gênesis",
    chapters: ["Gênesis 3", "Gênesis 4"],
    devotional: "A serpente era astuta, mas Deus é soberano. Mesmo no jardim perfeito, o pecado encontrou entrada através da desconfiança na bondade de Deus. Eva duvidou, Adão seguiu, e a humanidade caiu. Mas observe! No mesmo capítulo da queda, Deus pronuncia a primeira promessa do Evangelho. A semente da mulher esmagaria a cabeça da serpente. Cristo foi prometido antes que o primeiro sacrifício fosse feito. A graça de Deus se moveu antes mesmo que o homem buscasse perdão. Que amor incomparável!",
    reflection: "Onde você tem duvidado da bondade de Deus? Como a promessa da redenção em Cristo pode restaurar sua confiança hoje?",
    keyVerse: "E porei inimizade entre ti e a mulher, e entre a tua semente e a sua semente; esta te ferirá a cabeça, e tu lhe ferirás o calcanhar. - Gênesis 3:15"
  },
  {
    day: 3,
    date: "2025-01-03",
    book: "Gênesis",
    chapters: ["Gênesis 5", "Gênesis 6"],
    devotional: "Noé achou graça! Que palavras preciosas em meio ao juízo iminente. O mundo estava corrompido, a violência enchia a terra, mas Noé encontrou favor divino. Não porque fosse perfeito, mas porque andava com Deus. A graça não é mérito nosso, é favor imerecido. Noé creu e obedeceu quando Deus ordenou construir uma arca onde não havia água. Sua fé o fez trabalhar por 120 anos em um projeto que parecia loucura aos outros. A verdadeira fé obedece mesmo quando não compreende completamente.",
    reflection: "Você tem andado com Deus mesmo quando o mundo ao seu redor segue outro caminho? Que ato de obediência Deus está chamando você para fazer hoje?",
    keyVerse: "Porém Noé achou graça aos olhos do SENHOR. - Gênesis 6:8"
  },
  {
    day: 4,
    date: "2025-01-04",
    book: "Gênesis",
    chapters: ["Gênesis 7", "Gênesis 8"],
    devotional: "E lembrou-se Deus de Noé. Não que Ele tivesse esquecido! Deus não esquece, não dorme, não é distraído. Mas chegou o momento de Deus agir em livramento. Por meses, Noé e sua família estiveram na arca, rodeados de água, sem ver terra. Imagine a fé necessária! Mas Deus tinha Noé em Sua mente o tempo todo. O mesmo Deus que fechou a porta da arca quando o juízo veio, fez soprar o vento quando era hora da restauração. Nossas esperas não significam que Deus se esqueceu. Ele age no tempo perfeito.",
    reflection: "Em que área da sua vida você precisa confiar que Deus não se esqueceu de você? Como você pode fortalecer sua fé durante a espera?",
    keyVerse: "E lembrou-se Deus de Noé... - Gênesis 8:1"
  },
  {
    day: 5,
    date: "2025-01-05",
    book: "Gênesis",
    chapters: ["Gênesis 9", "Gênesis 10", "Gênesis 11"],
    devotional: "O meu arco tenho posto! Que símbolo maravilhoso da aliança divina. Deus colocou Seu arco nas nuvens como memorial eterno de Sua promessa. Não importa quão escuras sejam as nuvens do juízo, o arco-íris declara que a misericórdia triunfa. Cada vez que a chuva cai e o sol brilha através dela, Deus nos lembra: 'Eu mantenho Minhas promessas'. Sua Palavra é mais firme que as montanhas. Ele não pode mentir, não mudará de ideia. Se Deus prometeu, Ele cumprirá. Descanse nesta verdade hoje!",
    reflection: "Que promessa específica de Deus você precisa reivindicar pela fé hoje? Como o arco-íris pode servir de lembrete visual da fidelidade de Deus?",
    keyVerse: "O meu arco tenho posto nas nuvens; este será por sinal da aliança entre mim e a terra. - Gênesis 9:13"
  }
];

// Get or set the plan start date (uses local timezone)
export const getPlanStartDate = (): Date => {
  const saved = localStorage.getItem('planStartDate');
  if (saved) {
    const [year, month, day] = saved.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  // Default to today if not set
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  localStorage.setItem('planStartDate', dateString);
  return today;
};

export const setPlanStartDate = (date: Date): void => {
  date.setHours(0, 0, 0, 0);
  const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  localStorage.setItem('planStartDate', dateString);
};

// Calculate current day based on start date (uses local timezone)
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
