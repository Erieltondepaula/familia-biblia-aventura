// Reading plan with Old Testament + New Testament + Spurgeon's promises
export interface DailyReading {
  day: number;
  date: string;
  oldTestament: string; // Ex: "Gênesis 1"
  newTestament: string; // Ex: "Mateus 1"
  devotionalTitle: string; // Título da promessa
  devotional: string; // Texto do Spurgeon
  reflection: string; // Reflexão/aplicação
  keyVerse: string; // Versículo principal
  book: string; // Para mostrar no header
  chapters: string[]; // Array com os 2 capítulos para checklist
}

export const readingPlan: DailyReading[] = [
  {
    day: 1,
    date: "2025-01-01",
    oldTestament: "Gênesis 1",
    newTestament: "Mateus 1",
    book: "Gênesis 1 • Mateus 1",
    chapters: ["Gênesis 1", "Mateus 1"],
    devotionalTitle: "A PRIMEIRA PROMESSA DA BÍBLIA",
    devotional: "Esta é a primeira promessa ao homem caído. Ela contém todo o evangelho e a essência da aliança da graça. Tem sido em grande medida cumprida. O descendente da mulher, precisamente nosso Senhor Jesus, foi ferido em Seus calcanhares, e foi uma terrível ferida. Quão terrível será a ferida final da cabeça da serpente! Isso foi praticamente realizado quando Jesus removeu o pecado, venceu a morte e quebrou o poder de Satanás; mas aguarda uma realização ainda mais completa no Segundo Advento de nosso Senhor e no dia do Juízo. Para nós, a promessa é uma profecia de que seremos afligidos pelos poderes do mal em nossa natureza inferior e, portanto, feridos em nossos calcanhares; mas triunfaremos em Cristo, que põe Seu pé na cabeça da antiga serpente. Ao longo deste ano, talvez tenhamos que aprender a primeira parte desta promessa por experiência, pelas tentações do diabo e pela crueldade dos ímpios, que são sua descendência. Elas podem nos machucar tanto que podemos mancar com o calcanhar dolorido; mas entendamos a segunda parte do texto, e não ficaremos desanimados. Pela fé, nos alegremos que ainda reinaremos em Cristo Jesus, o descendente da mulher.",
    reflection: "Como você pode descansar na promessa de vitória final sobre o mal, mesmo quando sente as 'feridas no calcanhar' das tentações e provações?",
    keyVerse: "Porei inimizade entre ti e a mulher, entre a tua descendência e o seu descendente. Este te ferirá a cabeça, e tu lhe ferirás o calcanhar. - Gênesis 3:15"
  },
  {
    day: 2,
    date: "2025-01-02",
    oldTestament: "Gênesis 2",
    newTestament: "Mateus 2",
    book: "Gênesis 2 • Mateus 2",
    chapters: ["Gênesis 2", "Mateus 2"],
    devotionalTitle: "CONQUISTA DA VITÓRIA",
    devotional: "Essa promessa segue bem a de ontem. É evidente que devemos estar em conformidade com a Cabeça de nossa aliança, não apenas com Ele sendo ferido em Seus calcanhares, mas com Sua conquista sobre o mal. Precisamente debaixo de nossos pés o antigo dragão será ferido. Os crentes romanos ficaram entristecidos com o conflito na igreja; mas o Deus deles era 'o Deus da paz' e lhes deu descanso para a alma. O arqui-inimigo tropeçou os pés dos incautos e enganou os corações dos simples; mas ele deve receber o pior de tudo e ser pisoteado por aqueles a quem perturbou. Essa vitória não chegaria ao povo de Deus através de sua própria habilidade ou poder; mas o próprio Deus deseja esmagar a Satanás. Embora estivesse sob os pés deles, no entanto, a ferida seria somente do Senhor. Pisemos bravamente no tentador! Não apenas espíritos inferiores, mas o próprio Príncipe das trevas deve descer diante de nós. Com confiança inquestionável em Deus, busquemos uma vitória rápida. 'EM BREVE'. Feliz palavras! Em breve pisaremos na antiga serpente! Que alegria esmagar o mal! Que desonra para Satanás ter sua cabeça ferida pelos pés humanos! Vamos, pela fé em Jesus, pisar no tentador.",
    reflection: "Onde você precisa confiar que 'em breve' Deus esmagará a tentação ou o conflito que você enfrenta? Como pode pisar bravamente no tentador hoje?",
    keyVerse: "E o Deus da paz, em breve, esmagará debaixo dos vossos pés a Satanás. - Romanos 16:20"
  },
  {
    day: 3,
    date: "2025-01-03",
    oldTestament: "Gênesis 3",
    newTestament: "Mateus 3",
    book: "Gênesis 3 • Mateus 3",
    chapters: ["Gênesis 3", "Mateus 3"],
    devotionalTitle: "DESCANSO EM UMA PROMESSA",
    devotional: "Nenhuma promessa é de interpretação pessoal. Ela não pertence a um santo, mas a todos os crentes. Se, meu irmão, tu podes com fé deitar-te numa promessa e descansar nela, ela é tua. Onde Jacó 'caiu', permaneceu e descansou, dali tomou posse. Estendendo seu corpo cansado no chão, com as pedras daquele lugar como seus travesseiros, ele pouco imaginava que estava, dessa forma, assumindo a propriedade da terra; e assim aconteceu. Ele viu em seu sonho aquela escada maravilhosa que une terra e céu para todos os verdadeiros crentes; e certamente ele devia ter direito ao solo onde ficava o pé da escada, pois, caso contrário, não poderia alcançar a escada divina. Todas as promessas de Deus são Sim e Amém em Cristo Jesus; e assim como Ele é nosso, toda promessa é nossa, se apenas nos deitarmos nela com fé repousante. Venha, você que está cansado, e use as palavras de teu Senhor como teus travesseiros. Deita-te em paz. Sonha apenas com Ele. Jesus é tua escada de luz. Vê os anjos indo e vindo sobre Ele, entre a tua alma e o teu Deus, e estejas certo de que a promessa é a tua parte dada por Deus e que não será um roubo pegá-la para ti mesmo, como te foi especialmente dito.",
    reflection: "Que promessa específica de Deus você precisa tomar como 'travesseiro' e descansar nela pela fé hoje?",
    keyVerse: "A terra em que agora estás deitado, Eu ta darei, a ti e à tua descendência. - Gênesis 28:13"
  },
  {
    day: 4,
    date: "2025-01-04",
    oldTestament: "Gênesis 4",
    newTestament: "Mateus 4",
    book: "Gênesis 4 • Mateus 4",
    chapters: ["Gênesis 4", "Mateus 4"],
    devotionalTitle: "EM TRANQUILO REPOUSO",
    devotional: "Sim, os santos devem ter paz. A passagem da qual essa palavra graciosa é tirada fala de paz 'bestas-feras do campo, e com as aves do céu, e com os répteis da terra'. Isso é paz com inimigos terrestres, com males misteriosos e com pequenos aborrecimentos! Qualquer uma dessas coisas pode nos impedir de repousar, mas nenhuma delas o fará. O Senhor destruirá completamente as coisas que ameaçam o Seu povo: 'e tirarei da terra o arco, e a espada, e a guerra'. A paz será profunda, de fato, quando todos os instrumentos de inquietação forem quebrados em pedaços. Com esta paz virá o descanso. 'Pois assim dá Ele aos Seus amados o sono'. Totalmente supridos e divinamente acalmados, os crentes se deitam em tranquilo repouso. Esse descanso será um descanso seguro. Uma coisa é repousar, mas outra é 'repousar em segurança'. Somos levados à terra da promessa, à casa do Pai, ao quarto do amor e ao seio de Cristo. Certamente agora podemos 'repousar em segurança'. É mais seguro para um crente repousar em paz do que sentar-se e se preocupar. 'Ele me faz repousar em pastos verdejantes'. Nós nunca descansamos até que o Consolador nos faça repousar.",
    reflection: "Quais 'bestas-feras' ou 'pequenos aborrecimentos' estão roubando seu descanso? Como você pode confiar que Deus removerá esses instrumentos de inquietação?",
    keyVerse: "E farei o Meu povo repousar em segurança. - Oséias 2:18"
  },
  {
    day: 5,
    date: "2025-01-05",
    oldTestament: "Gênesis 5",
    newTestament: "Mateus 5",
    book: "Gênesis 5 • Mateus 5",
    chapters: ["Gênesis 5", "Mateus 5"],
    devotionalTitle: "UMA GARANTIA MARAVILHOSA",
    devotional: "Quando chamados a servir ou a sofrer, avaliamos nossas forças e descobrimos que são menores do que pensávamos e menos do que precisamos. Mas não deixemos nosso coração afundar dentro de nós enquanto tivermos tal palavra para recorrer, pois ela nos garante tudo o que possivelmente precisamos. Deus tem força onipotente; essa força Ele pode transmitir a nós, e Sua promessa é que Ele o fará. Ele será o alimento de nossas almas e a saúde de nossos corações, e assim Ele nos dará força. Não há como dizer quanta força Deus pode colocar em um homem. Quando a força divina chega, a fraqueza humana não é mais um obstáculo. Não nos lembramos de períodos de trabalho e provação em que recebemos uma força tão especial que nos admiramos? Em meio ao perigo estávamos calmos, sob luto nos resignamos, na calúnia nos contivemos e, na doença fomos pacientes. O fato é que Deus dá força inesperada quando provações incomuns surgem sobre nós. Emergimos de nossas personalidades fracas. Os covardes pelejam varonilmente, os tolos recebem sabedoria, e os mudos recebem na mesma hora o que devem falar. Minha própria fraqueza me faz encolher, mas a promessa de Deus me torna corajoso. Senhor, fortalece-me 'segundo a Tua palavra'.",
    reflection: "Em que área você se sente fraco hoje? Como pode reivindicar a promessa de que Deus o fortalecerá com força onipotente?",
    keyVerse: "Eu te fortaleço. - Isaías 41:10"
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
