// Robert M'Cheyne Bible Reading Plan
// Complete annual Bible reading plan with 4 chapters per day

export interface McCheyneReading {
  day: number;
  date: string; // MM-DD format
  familyOT: string; // Leitura Familiar - Antigo Testamento
  familyNT: string; // Leitura Familiar - Novo Testamento
  personalOT: string; // Leitura Pessoal - Antigo Testamento
  personalNT: string; // Leitura Pessoal - Novo Testamento
  morningVerse: string; // Spurgeon Manhã
  morningDevotional: string;
  eveningVerse: string; // Spurgeon Noite
  eveningDevotional: string;
  reflection: string;
}

// Helper to get all chapters as array
export const getAllChapters = (reading: McCheyneReading): string[] => {
  return [
    reading.familyOT,
    reading.familyNT,
    reading.personalOT,
    reading.personalNT
  ];
};

// Complete M'Cheyne plan for 365 days
export const mcCheyneReadingPlan: McCheyneReading[] = [
  // JANEIRO
  {
    day: 1,
    date: "01-01",
    familyOT: "Gênesis 1",
    familyNT: "Mateus 1",
    personalOT: "Esdras 1",
    personalNT: "Atos 1",
    morningVerse: "Josué 5:12",
    morningDevotional: "A cansativa peregrinação de Israel chegava ao fim e o descanso prometido fora atingido. Eles haviam chegado na terra que mana leite e mel, e comeriam dos frutos daquela terra. Talvez este ano, amado leitor cristão, esse possa ser o seu caso ou o meu. Consolação eterna é a nossa herança e, se a fé está em diligente atividade, ela lhe proporcionará uma perfeita alegria. Iremos, este ano, recolher frutos celestes em solo terrestre, onde a fé e a esperança fazem com que os lugares áridos sejam como o jardim do Senhor.",
    eveningVerse: "Cantares 1:4",
    eveningDevotional: "Teremos o maior prazer e a maior alegria em Ti. Não abriremos os portões do novo ano para as dolorosas notas da cítara, mas para as doces melodias da harpa de júbilo. Nós, os que fomos chamados fiéis e escolhidos, lançaremos fora nossos sofrimentos e levantaremos os estandartes da confiança em nome do Senhor. Jesus terá sempre a coroa do nosso coração. Uma vez que, ó doce Senhor Jesus, Tu és a presente porção do Teu povo, favorece-nos, este ano, com um sentimento tal de Tua preciosidade que possamos nos regozijar e nos alegrar em Ti.",
    reflection: "Como você pode começar este ano com alegria no Senhor? Que frutos espirituais você espera colher?"
  },
  {
    day: 2,
    date: "01-02",
    familyOT: "Gênesis 2",
    familyNT: "Mateus 2",
    personalOT: "Esdras 2",
    personalNT: "Atos 2",
    morningVerse: "Colossenses 4:2",
    morningDevotional: "É interessante observar como grande parte da Sagrada Escritura está ocupada com o tema da oração. Podemos estar certos que tudo aquilo que Deus faz proeminente em Sua Palavra, Sua intenção é ser visível em nossas vidas. Uma alma sem oração é uma alma sem Cristo. A oração é o balbuciar do crente pueril, o grito do crente guerreiro, o réquiem de morte do santo adormecendo em Jesus; é a respiração, a palavra de ordem, o conforto, a força, a honra de um cristão. O lema para este ano deve ser: 'Perseverai em oração'.",
    eveningVerse: "Isaías 41:1",
    eveningDevotional: "Todas as coisas na Terra precisam ser renovadas. Tampouco a vida do homem pode ser sustentada sem a renovação de Deus. Devemos revigorar o desgaste da alma nos alimentando do Livro de Deus. Sem constante restauração não estaremos prontos para as contínuas investidas do inferno. Aproximemo-nos do escabelo da misericórdia divina em humilde súplica, e receberemos o cumprimento da promessa: 'Os que esperam no Senhor renovarão as forças'.",
    reflection: "Como você pode perseverar em oração este ano? De que forma você precisa ser renovado?"
  },
  {
    day: 3,
    date: "01-03",
    familyOT: "Gênesis 3",
    familyNT: "Mateus 3",
    personalOT: "Esdras 3",
    personalNT: "Atos 3",
    morningVerse: "Isaías 49:8",
    morningDevotional: "Jesus Cristo é, Ele próprio, a essência da aliança. Crente, podes estimar aquilo que obtiveste em Cristo? Tudo aquilo que Cristo, como Deus e homem, já teve ou tem, é teu por puro e gratuito favor. Nosso bendito Jesus, como Deus, é onisciente, onipresente e onipotente. Tem Ele poder? Esse poder é teu para lhe sustentar e fortalecer. Tem Ele amor? Não há sequer uma gota de amor em Seu coração que não seja tua. Cristo está na aliança.",
    eveningVerse: "Lucas 3:4",
    eveningDevotional: "A voz que clamava no deserto exigiu uma vereda para o Senhor. 'Todo o vale se encherá' - pensamentos baixos sobre Deus devem ser abandonados. 'E se abaixará todo o monte' - orgulho deve ser aplainado. 'O que é tortuoso se endireitará' - o coração vacilante deve tomar decisão por Deus. 'Os caminhos escabrosos se aplanarão' - tropeços do pecado devem ser removidos. Oh, que o Senhor possa encontrar em meu coração uma estrada preparada pela Sua graça.",
    reflection: "Que 'vales' de dúvida e 'montes' de orgulho precisam ser nivelados em seu coração?"
  },
  {
    day: 4,
    date: "01-04",
    familyOT: "Gênesis 4",
    familyNT: "Mateus 4",
    personalOT: "Esdras 4",
    personalNT: "Atos 4",
    morningVerse: "2 Pedro 3:18",
    morningDevotional: "'Crescei na graça', não apenas em uma graça, mas em toda a graça. Crescei na fé, no amor, na humildade. Que Deus permita que o Espírito Santo nos faça 'crescer no conhecimento de nosso Senhor e Salvador'. Conhecer nEle a 'vida eterna' é crescer em felicidade. Procure saber mais sobre Ele em Sua natureza divina, em Sua obra acabada, em Sua morte, em Sua ressurreição, em Sua gloriosa intercessão.",
    eveningVerse: "Gênesis 42:8",
    eveningDevotional: "O conhecimento de nosso celestial José sobre nós foi abençoadamente perfeito muito antes de termos qualquer conhecimento dEle. Ele nos conheceu antes de nascermos. Seu conhecimento de nós é exato, profundo, completo. Ele sabe nossas fraquezas, nossos pecados, nossas necessidades. E esse conhecimento não O afasta de nós, mas O move à compaixão e à graça. Que conforto saber que somos plenamente conhecidos por Aquele que nos ama perfeitamente!",
    reflection: "Em quais áreas você precisa crescer? Como o conhecimento perfeito que Jesus tem de você pode confortá-lo?"
  },
  {
    day: 5,
    date: "01-05",
    familyOT: "Gênesis 5",
    familyNT: "Mateus 5",
    personalOT: "Esdras 5",
    personalNT: "Atos 5",
    morningVerse: "Salmo 84:11",
    morningDevotional: "'O Senhor não negará bem algum aos que andam na retidão'. Não diz 'Ele concederá alguns bens', mas 'nenhum bem negará'. Seja temporal ou espiritual, se for realmente um bem, Deus o concederá aos justos. Às vezes pensamos que algo seria bom, mas Deus em Sua sabedoria não o concede porque não seria realmente benéfico. Ele dará graça na terra e glória no céu. Que consolo para os santos!",
    eveningVerse: "Salmo 5:11",
    eveningDevotional: "'Alegrem-se todos os que confiam em ti; exultem eternamente'. A condição de alegria perpétua é depositar nossa confiança em Deus. O crente está sempre seguro. Por isso ele se alegra. Esta alegria não é superficial nem temporária - é eterna. O mundo pode nos decepcionar, mas Deus nunca falhará. Amigos podem nos abandonar, mas Deus permanece fiel. Nossa alegria nEle pode ser perpétua!",
    reflection: "Você tem experimentado alegria perpétua ao confiar no Senhor?"
  }
];

// Total chapters in the Bible
export const TOTAL_BIBLE_CHAPTERS = 1189;

// Calculate reading progress
export const calculateReadingProgress = (completedChaptersCount: number): number => {
  return Math.round((completedChaptersCount / TOTAL_BIBLE_CHAPTERS) * 100 * 10) / 10;
};

// Get reading by day number
export const getReadingByDay = (day: number): McCheyneReading | undefined => {
  return mcCheyneReadingPlan.find(r => r.day === day);
};

// Get current day number based on plan start date
export const getPlanStartDate = (): Date => {
  const saved = localStorage.getItem('planStartDate');
  if (saved) {
    const [year, month, day] = saved.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  localStorage.setItem('planStartDate', dateString);
  return today;
};

export const getCurrentDayNumber = (): number => {
  const startDate = getPlanStartDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = today.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const dayNumber = diffDays + 1;
  return Math.max(1, Math.min(dayNumber, mcCheyneReadingPlan.length));
};

export const getCurrentDayReading = (): McCheyneReading => {
  const dayNumber = getCurrentDayNumber();
  return getReadingByDay(dayNumber) || mcCheyneReadingPlan[0];
};
