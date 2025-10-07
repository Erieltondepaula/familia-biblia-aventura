// Reading plan with Old Testament + New Testament + Morning & Evening devotionals
export interface DailyReading {
  day: number;
  date: string;
  oldTestament: string; // Ex: "Gênesis 1"
  newTestament: string; // Ex: "Mateus 1"
  book: string; // Para mostrar no header
  chapters: string[]; // Array com os 2 capítulos para checklist
  morningVerse: string; // Versículo da manhã
  morningDevotional: string; // Devocional da manhã
  eveningVerse: string; // Versículo da noite
  eveningDevotional: string; // Devocional da noite
  reflection: string; // Pergunta para reflexão pessoal
  keyVerse: string; // Versículo para memorizar
}

export const readingPlan: DailyReading[] = [
  {
    day: 1,
    date: "2025-01-01",
    oldTestament: "Gênesis 1",
    newTestament: "Mateus 1",
    book: "Gênesis 1 • Mateus 1",
    chapters: ["Gênesis 1", "Mateus 1"],
    morningVerse: "Josué 5:12",
    morningDevotional: "A cansativa peregrinação de Israel chegava ao fim e o descanso prometido fora atingido. Sem mais tendas móveis, serpentes abrasadoras, amalequitas ferozes e desertos vociferantes. Eles haviam chegado na terra que mana leite e mel, e comeriam dos frutos daquela terra. Talvez este ano, amado leitor cristão, esse possa ser o seu caso ou o meu. Consolação eterna é a nossa herança e, se a fé está em diligente atividade, ela lhe proporcionará uma perfeita alegria. Estar com Jesus no descanso que resta ao povo de Deus é certamente uma esperança animadora. Uma parte dos servos de Deus irá se demorar nesta terra para servir ao Senhor. Se essa for a nossa sorte, não há motivos para que aquela mensagem de ano novo não continue sendo verdadeira a nós. 'Porque nós, os que temos crido, entramos no repouso'. O Espírito Santo é o penhor da nossa herança; Ele nos dá a graça que precede nossa glória futura. Iremos, este ano, recolher frutos celestes em solo terrestre, onde a fé e a esperança fazem com que os lugares áridos sejam como o jardim do Senhor.",
    eveningVerse: "Cantares 1:4",
    eveningDevotional: "Teremos o maior prazer e a maior alegria em Ti. Não abriremos os portões do novo ano para as dolorosas notas da cítara, mas para as doces melodias da harpa de júbilo e para os altissonantes címbalos da alegria. Nós, os que fomos chamados fiéis e escolhidos, lançaremos fora nossos sofrimentos e levantaremos os estandartes da confiança em nome do Senhor. Eterno Espírito, nosso eficaz Consolador, nós que somos o templo em que Tu habitas, nunca cessaremos de adorar e bendizer o nome de Jesus. Estamos certos, estamos resolvidos sobre isto: Jesus terá sempre a coroa do nosso coração. Nós 'Nos regozijaremos e nos alegraremos'; duas palavras e um único sentido, dupla alegria, bem-aventurança sobre bem-aventurança. 'Nos regozijaremos e nos alegraremos EM TI'; esse final é a alma do texto. Que céus estão depositados em Jesus! Uma vez que, ó doce Senhor Jesus, Tu és a presente porção do Teu povo, favorece-nos, este ano, com um sentimento tal de Tua preciosidade que possamos nos regozijar e nos alegrar em Ti.",
    reflection: "Como você pode começar este ano com alegria no Senhor, mesmo em meio às dificuldades? Que 'frutos da terra de Canaã' você espera colher neste novo tempo?",
    keyVerse: "No mesmo ano comeram dos frutos da terra de Canaã. - Josué 5:12"
  },
  {
    day: 2,
    date: "2025-01-02",
    oldTestament: "Gênesis 2",
    newTestament: "Mateus 2",
    book: "Gênesis 2 • Mateus 2",
    chapters: ["Gênesis 2", "Mateus 2"],
    morningVerse: "Colossenses 4:2",
    morningDevotional: "É interessante observar como grande parte da Sagrada Escritura está ocupada com o tema da oração, seja fornecendo exemplos, reforçando o mandamento ou anunciando promessas. Exemplos são abundantes. Aqui, encontramos a luta de Jacó; lá, um Daniel que orava três vezes por dia; um Davi que, com todo seu coração, clamava pelo seu Deus. Podemos estar certos que tudo aquilo que Deus faz proeminente em Sua Palavra, Sua intenção é ser visível em nossas vidas. Se Ele falou muito sobre a oração é porque Ele sabe que temos muita necessidade de orar. Tu não queres coisa alguma? Então, temo que não conheças a tua pobreza. Uma alma sem oração é uma alma sem Cristo. A oração é o balbuciar do crente pueril, o grito do crente guerreiro, o réquiem de morte do santo adormecendo em Jesus; é a respiração, a palavra de ordem, o conforto, a força, a honra de um cristão. Ore para que, este ano, possas ser santo, humilde, zeloso e paciente. O lema para este ano deve ser: 'Perseverai em oração'.",
    eveningVerse: "Isaías 41:1",
    eveningDevotional: "Todas as coisas na Terra precisam ser renovadas. Nenhuma coisa criada mantém-se por si mesma. Tampouco a vida do homem pode ser sustentada sem a renovação de Deus. Assim como é necessário revigorar o desgaste do corpo por meio de refeições regulares, também devemos revigorar o desgaste da alma nos alimentando do Livro de Deus, ou pelo ouvir a pregação da Palavra. Quão miseráveis são nossas graças quando os meios de graça são negligenciados! Se a nossa devoção pode viver sem Deus, ela não é uma criação divina. Sem constante restauração não estaremos prontos para as contínuas investidas do inferno, ou para as duras provações vindas do céu. Quando vierem os vendavais, ai da árvore que não tiver sugado seiva fresca e agarrado firmemente a rocha com raízes entrelaçadas. Aproximemo-nos do escabelo da misericórdia divina em humilde súplica, e receberemos o cumprimento da promessa: 'Os que esperam no Senhor renovarão as forças'.",
    reflection: "Como você pode perseverar em oração este ano? De que forma você precisa ser renovado em suas forças espirituais?",
    keyVerse: "Perseverai em oração. - Colossenses 4:2"
  },
  {
    day: 3,
    date: "2025-01-03",
    oldTestament: "Gênesis 3",
    newTestament: "Mateus 3",
    book: "Gênesis 3 • Mateus 3",
    chapters: ["Gênesis 3", "Mateus 3"],
    morningVerse: "Isaías 49:8",
    morningDevotional: "Jesus Cristo é, Ele próprio, a essência da aliança. Ele é propriedade de todo cristão. Crente, podes estimar aquilo que obtiveste em Cristo? 'Porque nele habita corporalmente toda a plenitude da divindade'. Considere que tudo aquilo que Cristo, como Deus e homem, já teve ou tem, é teu por puro e gratuito favor. Nosso bendito Jesus, como Deus, é onisciente, onipresente e onipotente. Tem Ele poder? Esse poder é teu para lhe sustentar e fortalecer. Tem Ele amor? Não há sequer uma gota de amor em Seu coração que não seja tua. Você pode mergulhar no imenso oceano de Seu amor e dizer: 'É meu'. E tudo o que Ele tem, como homem perfeito, é teu. A aceitação de Deus a Cristo é a tua aceitação, pois não sabes que o amor do Pai, que estava sobre o perfeito Cristo, está agora sobre ti? Aquela perfeita justiça que Jesus manifestou quando, por meio de Sua vida imaculada, Ele guardou toda a lei, é tua, e é imputada a ti. Cristo está na aliança.",
    eveningVerse: "Lucas 3:4",
    eveningDevotional: "A voz que clamava no deserto exigiu uma vereda para o Senhor, uma vereda preparada no deserto. 'Todo o vale se encherá'. Pensamentos baixos e vis sobre Deus devem ser abandonados; toda dúvida e todo desespero devem ser removidos. 'E se abaixará todo o monte e outeiro'. Orgulho humano autossuficiente, arrogância e autojustiça devem ser aplainados. Comunhão divina nunca é concedida aos altivos. O Senhor tem prazer nos humildes. 'E o que é tortuoso se endireitará'. O coração vacilante deve tomar um caminho firme na decisão por Deus e pela santidade. Minha alma, cuide-se para ser honesta e verdadeira em todas as coisas. 'E os caminhos escabrosos se aplanarão'. Tropeços decorrentes do pecado devem ser removidos. Oh, que esta noite o Senhor possa encontrar em meu coração uma estrada preparada pela Sua graça; que Ele possa fazer uma triunfal marcha através dos limites mais extremos da minha alma.",
    reflection: "Que 'vales' de dúvida e 'montes' de orgulho precisam ser nivelados em seu coração para que Jesus possa fazer Sua morada completa em você?",
    keyVerse: "Preparai o caminho do Senhor; Endireitai as suas veredas. - Lucas 3:4"
  },
  {
    day: 4,
    date: "2025-01-04",
    oldTestament: "Gênesis 4",
    newTestament: "Mateus 4",
    book: "Gênesis 4 • Mateus 4",
    chapters: ["Gênesis 4", "Mateus 4"],
    morningVerse: "2 Pedro 3:18",
    morningDevotional: "'Crescei na graça', não apenas em uma graça, mas em toda a graça. Crescei naquela graça que tem raiz, ou seja, a fé. Acredite nas promessas com mais firmeza. Crescei também no amor. Peça para que seu amor possa crescer, ser mais intenso, mais prático, influenciando cada pensamento, palavra e ação. Crescei também na humildade, e procure saber mais de sua própria insignificância. À medida que crescemos para baixo em humildade, busquemos também crescer para cima, nos aproximando de Deus em oração e comunhão mais íntima com Jesus. Que Deus permita que o Espírito Santo nos faça 'crescer no conhecimento de nosso Senhor e Salvador'. Conhecer nEle a 'vida eterna', e avançar no conhecimento dEle, é crescer em felicidade. Procure saber mais sobre Ele em Sua natureza divina, em Seu relacionamento humano, em Sua obra acabada, em Sua morte, em Sua ressurreição, em Sua gloriosa intercessão e em Seu majestoso advento futuro.",
    eveningVerse: "Gênesis 42:8",
    eveningDevotional: "Nossos desejos foram direcionados ao crescimento de nosso conhecimento do Senhor Jesus. Agora será proveitoso considerar um tema afim, que é o conhecimento de nosso celestial José sobre nós. Esse conhecimento foi abençoadamente perfeito muito antes de termos qualquer conhecimento dEle. Ele nos conheceu antes de nascermos, antes de termos consciência, antes de O conhecermos. Seu conhecimento de nós é exato, profundo, completo. Ele sabe nossas fraquezas, nossos pecados, nossas necessidades. E esse conhecimento não O afasta de nós, mas O move à compaixão e à graça. Como José conhecia seus irmãos que não o reconheceram, assim Jesus nos conhece perfeitamente, mesmo quando nossa compreensão dEle é turva e limitada. Que conforto saber que somos plenamente conhecidos por Aquele que nos ama perfeitamente!",
    reflection: "Em quais áreas de sua vida espiritual você precisa crescer? Como o conhecimento perfeito que Jesus tem de você pode confortá-lo hoje?",
    keyVerse: "Antes crescei na graça e conhecimento de nosso Senhor e Salvador, Jesus Cristo. - 2 Pedro 3:18"
  },
  {
    day: 5,
    date: "2025-01-05",
    oldTestament: "Gênesis 5",
    newTestament: "Mateus 5",
    book: "Gênesis 5 • Mateus 5",
    chapters: ["Gênesis 5", "Mateus 5"],
    morningVerse: "Salmo 84:11",
    morningDevotional: "'O Senhor não negará bem algum aos que andam na retidão'. Este versículo contém uma promessa maravilhosa. Deus é tanto um Sol para iluminar quanto um Escudo para proteger. Não há bem que Ele retenha daqueles que andam retamente. Considere a generosidade desta promessa. Não diz 'Ele concederá alguns bens', mas 'nenhum bem negará'. Seja temporal ou espiritual, se for realmente um bem, Deus o concederá aos justos. Às vezes pensamos que algo seria bom para nós, mas Deus em Sua sabedoria não o concede porque não seria realmente benéfico. Podemos estar certos de que se algo é verdadeiramente bom, o Senhor não o reterá. Ele dará graça na terra e glória no céu. Entre estes dois extremos, todas as bênçãos intermediárias estão incluídas. Que consolo para os santos! Nenhum bem será retido!",
    eveningVerse: "Salmo 5:11",
    eveningDevotional: "'Mas alegrem-se todos os que confiam em ti; exultem eternamente, porquanto tu os defendes; e em ti se gloriem os que amam o teu nome'. A condição de alegria perpétua é depositar nossa confiança em Deus. O crente está sempre seguro. Ele coloca sua confiança no Senhor, não em si mesmo, não em suas riquezas, não em sua sabedoria, mas no Senhor seu Deus. Por isso ele se alegra. Esta alegria não é superficial nem temporária - é eterna. 'Exultem eternamente', diz o texto. Há uma fonte inesgotável de alegria para aqueles que confiam no Senhor. O mundo pode nos decepcionar, mas Deus nunca falhará. Amigos podem nos abandonar, mas Deus permanece fiel. Circunstâncias podem mudar, mas Deus é imutável. Portanto, nossa alegria nEle pode ser perpétua. Que privilégio é amar o nome do Senhor e se gloriar nEle continuamente!",
    reflection: "Você tem experimentado alegria perpétua ao confiar no Senhor? Que 'bens' você precisa reconhecer que Deus, em Sua sabedoria, pode estar retendo porque não seriam verdadeiramente benéficos?",
    keyVerse: "O Senhor não negará bem algum aos que andam na retidão. - Salmo 84:11"
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
