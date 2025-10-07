// Devotional content generator for M'Cheyne reading plan
// Inspired by Charles Spurgeon's "Morning & Evening" devotional style

interface DevotionalContent {
  morningVerse: string;
  morningDevotional: string;
  eveningVerse: string;
  eveningDevotional: string;
  reflection: string;
  verseOfDay: string;
}

// Rich biblical verses pool for memorization
const bibleVerses = [
  "João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
  "Salmos 23:1-3 - O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas. Refrigera a minha alma.",
  "Provérbios 3:5-6 - Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
  "Filipenses 4:13 - Posso todas as coisas naquele que me fortalece.",
  "Romanos 8:28 - E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
  "Isaías 41:10 - Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
  "Jeremias 29:11 - Porque sou eu que conheço os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
  "Mateus 11:28-29 - Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei. Tomai sobre vós o meu jugo, e aprendei de mim.",
  "2 Timóteo 1:7 - Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
  "Salmos 119:105 - Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho.",
  "Isaías 40:31 - Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
  "1 Coríntios 10:13 - Não veio sobre vós tentação, senão humana; mas fiel é Deus, que não vos deixará tentar acima do que podeis.",
  "Salmos 46:1 - Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
  "Josué 1:9 - Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.",
  "Filipenses 4:6-7 - Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.",
];

// Generate devotional content based on the day's readings in Spurgeon's style
export const generateDevotionalContent = (
  familyOT: string,
  familyNT: string,
  personalOT: string,
  personalNT: string,
  dayNumber: number
): DevotionalContent => {
  
  // Extract book names for reference
  const familyOTBook = familyOT.split(' ')[0];
  const familyNTBook = familyNT.split(' ')[0];
  const personalOTBook = personalOT.split(' ')[0];
  const personalNTBook = personalNT.split(' ')[0];
  
  // Verse of the day for memorization
  const verseOfDay = bibleVerses[dayNumber % bibleVerses.length];
  
  // Morning verse based on family reading
  const morningVerse = `${familyOT}`;
  
  // Morning devotionals in Spurgeon's deep theological style
  const morningDevoArr = [
    `Ao amanhecer este dia, somos convocados a contemplar as Sagradas Escrituras com reverência e expectativa. A leitura de ${familyOT} nos recorda da fidelidade imutável de Deus através das gerações. Não é extraordinário que o mesmo Deus que operou maravilhas nos tempos antigos ainda age em nossos dias?

Quando meditamos em ${familyNT}, vemos Cristo revelado em toda Sua glória - nosso Profeta que ensina, nosso Sacerdote que intercede, nosso Rei que governa. Cada palavra que Ele proferiu é preciosa; cada ato que realizou é significativo para nossa salvação.

Ó alma, não trates levianamente estes tesouros divinos! A Palavra não foi dada meramente para informação, mas para transformação. Ela é lâmpada que ilumina, espada que penetra, espelho que revela, e alimento que sustenta. Peça ao Espírito Santo que aplique estas verdades profundamente em teu coração hoje.

Que este dia seja marcado por uma resolução renovada de viver não segundo tua própria sabedoria, mas segundo a sabedoria celestial contida nestas páginas sagradas.`,

    `"Lâmpada para os meus pés é tua palavra" - assim declarou o salmista, e assim deve ser nosso testemunho esta manhã. As leituras de hoje - ${familyOT} e ${familyNT} - não são relíquias de um passado distante, mas a viva e eficaz Palavra de Deus que penetra até a divisão de alma e espírito.

Considera, ó cristão, a bondade incomparável de Deus em nos conceder Sua revelação! Quando os céus parecem silenciosos, as Escrituras falam com clareza. Quando o caminho se mostra obscuro, a Bíblia ilumina com certeza divina.

Não permitas que este dia transcorra sem haver meditado profundamente no que leste. Cada capítulo é uma carta de amor do Pai celestial; cada versículo, uma preciosa promessa ou sábia instrução. Alimenta tua alma com este pão celestial, pois assim como o corpo perece sem nutrição física, a alma definha sem o alimento da Palavra divina.

Aproxima-te das Escrituras com oração: "Abre os meus olhos, para que veja as maravilhas da tua lei". Somente então os tesouros escondidos serão revelados a ti.`,

    `Nesta manhã bendita, ao abrirmos as páginas sagradas para estudar ${familyOT}, reconheçamos que estamos pisando em solo santo. A Palavra de Deus não é ordinária - é extraordinária, é divina, é transformadora!

Cada porção das Escrituras revela mais do caráter glorioso de nosso Deus. Em ${familyNT}, contemplamos a graça de Cristo magnificamente manifestada; vemos Aquele que, sendo rico, por amor de nós se fez pobre, para que pela sua pobreza enriquecêssemos.

Ó crente, com que reverência devemos aproximar-nos destas páginas santas! Não as leias apressadamente, como quem cumpre um mero ritual religioso. Antes, vem com coração preparado, mente aberta e espírito humilde. O Espírito Santo é teu Mestre divino; somente Ele pode desvelar os olhos do entendimento para perceber as profundezas insondáveis de Deus.

Que as verdades absorvidas hoje não permaneçam apenas na mente, mas desçam ao coração, influenciem a vontade e se manifestem em tua conduta. Seja praticante da Palavra, não apenas ouvinte que se engana a si mesmo!`,

    `Ao romper desta nova alvorada, voltemos nossos pensamentos às verdades eternas reveladas em ${familyOT} e ${familyNT}. Que privilégio inestimável é ter a Palavra de Deus em nossas mãos e em nosso próprio idioma!

Pensa nos mártires que deram suas vidas para que pudéssemos possuir as Escrituras. Pensa nos reformadores que lutaram para que a Palavra fosse libertada das trevas e colocada nas mãos do povo. Não desperdices este privilégio precioso!

A Bíblia não é um livro comum entre muitos - é o Livro dos livros, a revelação suprema de Deus à humanidade. Quando a lês, não é meramente tinta sobre papel que contemplas, mas o próprio sopro de Deus falando à tua alma. Cada promessa é sim e amém em Cristo; cada mandamento expressa o amor santo de Deus.

Medita hoje sobre como tens tratado a Palavra. Tens fome e sede dela? Ou tua alma está satisfeita com as águas amargas deste mundo? Busca ao Senhor através de Sua Palavra, e certamente O encontrarás.`
  ];

  // Evening verse based on personal reading
  const eveningVerse = `${personalNT}`;
  
  // Evening devotionals for nighttime reflection
  const eveningDevoArr = [
    `Ao findar-se este dia, voltemo-nos novamente às Escrituras que meditamos. As leituras de ${personalOT} e ${personalNT} não foram dadas apenas para o momento da leitura, mas para serem o sustento de todo o dia.

Reflete agora: como as verdades estudadas esta manhã moldaram tuas decisões hoje? Foste fiel ao que aprendeste? Há consolação nesta pergunta, mesmo quando a resposta expõe nossa fraqueza, pois onde há convicção de pecado, há também graça abundante para arrependimento e renovação.

A noite é tempo propício para o exame da alma. Assim como o comerciante faz seu balanço ao fim do dia, também o cristão deve avaliar sua vida à luz da Palavra. Onde falhaste? Confessa sinceramente ao Senhor. Onde venceste? Dá graças a Ele, reconhecendo que toda vitória procede de Sua graça capacitadora.

Que possas descansar esta noite na certeza de que, embora sejas imperfeito, és profundamente amado pelo Pai. A mesma Palavra que te convence do pecado também te aponta para o Salvador. Dorme em paz, sabendo que Aquele que começou a boa obra em ti é fiel para completá-la.`,

    `As sombras vespertinas se aproximam, trazendo consigo a oportunidade de reflexão mais profunda sobre as Escrituras que percorremos hoje. Que tesouro inestimável são ${personalOT} e ${personalNT}! Cada palavra é divinamente inspirada, cada verdade é eternamente preciosa.

Considera quão rapidamente passou este dia. Amanhã poderá não chegar; portanto, quão importante é não deixar passar as lições de hoje sem aplicá-las! A vida é breve, a eternidade é longa. As palavras que leste têm peso eterno - não as trate com leviandade.

Neste momento de quietude, permite que o Espírito Santo traga à memória as verdades que mais tocaram teu coração hoje. Há alguma promessa que deves reclamar? Algum mandamento que deves obedecer com mais fidelidade? Algum exemplo que deves seguir? Algum pecado que deves abandonar definitivamente?

O Senhor não te deu Sua Palavra para ser um fardo pesado, mas uma bênção copiosa; não para te oprimir, mas para te libertar. Descansa nEle esta noite, confiante de que Sua Palavra não voltará vazia, mas cumprirá perfeitamente o propósito para o qual foi enviada.`,

    `Chegamos ao fim de mais um dia da graça divina. Ao refletirmos sobre as leituras - ${personalOT} e ${personalNT} - quão gratos devemos ser por termos a Palavra de Deus ao nosso alcance!

Enquanto te preparas para o descanso noturno, examina teu coração: guardaste a Palavra em tua mente e coração? Ela está produzindo fruto visível em tua vida? Ou foi como semente lançada à beira do caminho, facilmente arrebatada pelo inimigo antes de criar raízes?

O salmista declarou: "Escondi a tua palavra no meu coração, para eu não pecar contra ti". Tens feito assim? A memorização não é fim em si mesma, mas meio para uma vida mais santa e uma comunhão mais íntima com Deus.

Ora ao Senhor agora: "Pai celestial, que Tua Palavra habite ricamente em mim. Que ela seja mais doce que o mel, mais preciosa que ouro refinado. Guarda meu coração das tentações, fortalece minha fé nas provações, e faz de mim praticante fiel de Tua verdade. Que eu possa dormir em paz esta noite, confiante em Tuas promessas infalíveis. Em nome de Jesus, amém."`,

    `À medida que a noite se estabelece e o mundo ao redor aquieta, é momento apropriado para uma meditação serena sobre ${personalOT} e ${personalNT}. Estas Escrituras contêm sabedoria para guiar, consolo para confortar, e poder para transformar.

Reflete sobre a providência divina que te conduziu ao longo deste dia. Quantas vezes foste guardado de perigos que nem sequer percebeste? Quantas bênçãos recebeste que consideraste apenas coincidências? A mão de Deus estava sobre ti do começo ao fim.

A Palavra que estudaste hoje é parte do cuidado providencial de Deus por tua alma. Ele sabia que necessitarias destas verdades específicas neste tempo particular. Não há acidentes no calendário de leitura divina - tudo é ordenado com sabedoria perfeita.

Entrega a Deus tuas preocupações desta noite. As ansiedades do amanhã não pertencem a este dia. "Os que esperam no Senhor renovarão as forças". Confia nEle, descansa nEle, e permite que Sua paz, que excede todo entendimento, guarde teu coração e mente em Cristo Jesus.`
  ];

  // Reflection prompts in Spurgeon's introspective style
  const reflectionArr = [
    `A meditação nas Escrituras não alcança sua plenitude sem reflexão pessoal profunda e aplicação prática diligente. As leituras de hoje - ${familyOT}, ${familyNT}, ${personalOT} e ${personalNT} - contêm verdades que devem penetrar as profundezas da alma.

Perguntas para reflexão sincera e honesta:

• Que aspecto do caráter santo de Deus foi revelado nas leituras de hoje, e como isso transforma meu relacionamento com Ele?

• Há algum pecado, por menor que pareça, exposto pela luz da Palavra que preciso confessar e abandonar? Não permitas que orgulho ou negligência te impeçam de buscar purificação completa.

• Que promessa divina encontrei hoje que posso aplicar às circunstâncias presentes que enfrento? As promessas de Deus não são ornamentos decorativos, mas âncoras firmes para a alma.

• Como posso demonstrar obediência mais fiel aos mandamentos que li? Fé sem obras correspondentes é morta; verdadeiro conhecimento resulta inevitavelmente em mudança de vida.

• De que maneira posso compartilhar com outros o que aprendi hoje? A Palavra recebida deve também ser generosamente comunicada.

Reserve tempo para escrever tuas reflexões. O que escreves hoje pode tornar-se fonte preciosa de encorajamento em dias difíceis futuros.`,

    `"Examinai-vos a vós mesmos, se permaneceis na fé; provai-vos a vós mesmos" - assim nos exorta solenemente a Escritura. As leituras de hoje - ${familyOT}, ${familyNT}, ${personalOT} e ${personalNT} - provêem abundante material para tal exame necessário.

Reflete com humildade e honestidade completas:

• Que verdade específica das leituras de hoje tocou mais profundamente meu coração? Por que ressoou tão fortemente?

• Há alguma área de minha vida que está em desacordo evidente com o que li nas Escrituras? O Espírito Santo está me convencendo de alguma mudança necessária e urgente?

• Que ações práticas e específicas posso tomar esta semana para viver mais consistentemente com o que aprendi hoje? Generalidades vagas não bastam - seja específico.

• Como posso orar mais eficazmente baseado nas verdades que meditei? A Palavra de Deus deve moldar profundamente nossas orações, dando-lhes direção e poder.

• Há alguém com quem devo reconciliar-me ou a quem devo servir humildemente, conforme orientado pelas Escrituras hoje?

Lembra-te: reflexão sem ação correspondente é exercício completamente vão. Que o conhecimento da Palavra produza obediência fiel e fruto abundante em tua vida.`,

    `A Palavra de Deus é como espelho fiel que revela não apenas como somos em nossa realidade presente, mas também como devemos ser segundo o padrão divino. Ao contemplarmos as leituras de hoje - ${familyOT}, ${familyNT}, ${personalOT} e ${personalNT} - somos chamados a uma honesta e corajosa auto-avaliação.

Medita nestas questões solenes diante do Deus que tudo vê:

• Que características gloriosas de Cristo foram reveladas nas leituras de hoje que preciso cultivar urgentemente em minha própria vida?

• Há algum ídolo oculto em meu coração - talvez bem disfarçado de coisa legítima - que a Palavra expôs hoje? Estou genuinamente disposto a abandoná-lo completamente?

• Como as verdades de hoje fortalecem minha fé cambaleante diante das dúvidas persistentes e dificuldades que enfrento diariamente?

• Que diferença prática e observável fará em meu dia de amanhã ter lido e meditado profundamente nestas Escrituras hoje?

• Estou sendo mordomo fiel da Palavra que recebi? Estou vivendo à altura do conhecimento privilegiado que possuo, ou há hipocrisia em minha vida?

Não te contentes com respostas superficiais ou evasivas. Permite que o Espírito Santo sonde as profundezas ocultas do teu coração. A verdadeira espiritualidade não se mede pela vastidão do conhecimento que temos, mas pela profundidade da obediência que praticamos fielmente.`
  ];

  const morningDevotional = morningDevoArr[(dayNumber * 3) % morningDevoArr.length];
  const eveningDevotional = eveningDevoArr[(dayNumber * 5) % eveningDevoArr.length];
  const reflection = reflectionArr[(dayNumber * 7) % reflectionArr.length];

  return {
    morningVerse,
    morningDevotional,
    eveningVerse,
    eveningDevotional,
    reflection,
    verseOfDay
  };
};

// Get random verse for memorization
export const getRandomMemorizationVerse = (dayNumber: number): string => {
  return bibleVerses[dayNumber % bibleVerses.length];
};
