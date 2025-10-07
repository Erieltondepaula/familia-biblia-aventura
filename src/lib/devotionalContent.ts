// Devotional content generator for M'Cheyne reading plan

interface DevotionalContent {
  morningVerse: string;
  morningDevotional: string;
  eveningVerse: string;
  eveningDevotional: string;
  reflection: string;
  verseOfDay: string;
}

// Bible verses pool for random selection
const bibleverses = [
  "Salmos 119:105 - Lâmpada para os meus pés é a tua palavra e, luz para os meus caminhos.",
  "João 3:16 - Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.",
  "Filipenses 4:13 - Tudo posso naquele que me fortalece.",
  "Provérbios 3:5-6 - Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.",
  "Romanos 8:28 - Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus.",
  "Jeremias 29:11 - Eu é que sei que pensamentos tenho a vosso respeito, pensamentos de paz e não de mal.",
  "Mateus 11:28 - Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.",
  "2 Timóteo 1:7 - Deus não nos deu espírito de covardia, mas de poder, amor e moderação.",
  "Isaías 40:31 - Os que esperam no Senhor renovam as suas forças, sobem com asas como águias.",
  "Salmos 23:1 - O Senhor é o meu pastor; nada me faltará.",
];

// Generate devotional content based on readings
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
  
  // Random verse of the day
  const verseOfDay = bibleverses[dayNumber % bibleverses.length];
  
  // Morning devotional - focus on family reading
  const morningVerse = `${familyOT} e ${familyNT}`;
  const morningDevotional = `Ao amanhecer, reflita sobre as leituras de ${familyOTBook} e ${familyNTBook}. 

Como essas passagens revelam o caráter de Deus? Que verdades eternas você pode extrair destes textos para guiar seu dia?

Ore pedindo sabedoria para aplicar esses princípios em suas decisões diárias. Peça ao Espírito Santo que ilumine seu entendimento e torne a Palavra viva em seu coração.

Compartilhe com sua família uma lição aprendida dessas leituras durante o café da manhã ou início do dia.`;

  // Evening devotional - focus on personal reading  
  const eveningVerse = `${personalOT} e ${personalNT}`;
  const eveningDevotional = `Ao final do dia, medite nas leituras de ${personalOTBook} e ${personalNTBook}.

Que promessas de Deus você encontrou hoje? Como Ele falou ao seu coração através dessas escrituras?

Examine seu dia à luz dessas verdades. Houve momentos onde você poderia ter agido de forma mais alinhada com a Palavra de Deus?

Termine o dia em oração, agradecendo pelas revelações recebidas e comprometendo-se a viver mais fielmente amanhã.`;

  // Reflection prompt
  const reflection = `Após ler ${familyOT}, ${familyNT}, ${personalOT} e ${personalNT}, reflita:

• Qual versículo mais tocou seu coração hoje e por quê?
• Como essas leituras se aplicam à sua vida atual?
• Que mudanças Deus está pedindo que você faça?
• Por quem você precisa orar com base no que leu?

Escreva suas reflexões pessoais abaixo:`;

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
  return bibleverses[dayNumber % bibleverses.length];
};
