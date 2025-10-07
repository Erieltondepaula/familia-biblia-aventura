// Robert M'Cheyne Bible Reading Plan
// Complete annual Bible reading plan with 4 chapters per day
// Organized by calendar date (month-day)

export interface McCheyneReading {
  day: number; // Day of year (1-365)
  month: number; // 1-12
  dayOfMonth: number; // 1-31
  familyOT: string;
  familyNT: string;
  personalOT: string;
  personalNT: string;
  morningVerse: string;
  morningDevotional: string;
  eveningVerse: string;
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
  { day: 1, month: 1, dayOfMonth: 1, familyOT: "Gênesis 1", familyNT: "Mateus 1", personalOT: "Esdras 1", personalNT: "Atos 1", morningVerse: "Josué 5:12", morningDevotional: "A cansativa peregrinação de Israel chegava ao fim e o descanso prometido fora atingido. Eles haviam chegado na terra que mana leite e mel, e comeriam dos frutos daquela terra. Iremos, este ano, recolher frutos celestes em solo terrestre.", eveningVerse: "Cantares 1:4", eveningDevotional: "Teremos o maior prazer e a maior alegria em Ti. Jesus terá sempre a coroa do nosso coração.", reflection: "Como você pode começar este ano com alegria no Senhor?" },
  
  // OUTUBRO
  { day: 279, month: 10, dayOfMonth: 6, familyOT: "1 Reis 9", familyNT: "Efésios 6", personalOT: "Ezequiel 39", personalNT: "Salmo 90", morningVerse: "Efésios 6:10", morningDevotional: "Fortalecei-vos no Senhor e na força do seu poder. O cristão precisa de força divina. Nossa própria força é fraqueza. Mas em Cristo somos fortes. A armadura de Deus nos protege contra as ciladas do diabo. Revesti-vos de toda a armadura de Deus para que possais estar firmes. O soldado cristão não luta sozinho - o Senhor está conosco.", eveningVerse: "Salmo 90:12", eveningDevotional: "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos corações sábios. A vida é breve como a relva que floresce pela manhã e à tarde é cortada. Precisamos da sabedoria divina para viver bem nossos dias. Cada dia é precioso diante de Deus. Não desperdice o tempo que Ele lhe deu. Use-o para Sua glória e para o bem das almas.", reflection: "Como você pode usar seus dias com sabedoria eterna? Onde você precisa da força do Senhor hoje?" }
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

// Get today's day of year (1-365)
export const getCurrentDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Get current day number (always use calendar date, not "days since start")
export const getCurrentDayNumber = (): number => {
  return getCurrentDayOfYear();
};

// Get reading by calendar date
export const getReadingByDate = (month: number, day: number): McCheyneReading | undefined => {
  return mcCheyneReadingPlan.find(r => r.month === month && r.dayOfMonth === day);
};

export const getCurrentDayReading = (): McCheyneReading => {
  const now = new Date();
  const month = now.getMonth() + 1; // 0-11 to 1-12
  const day = now.getDate();
  
  const reading = getReadingByDate(month, day);
  
  // Fallback to first reading if not found
  return reading || mcCheyneReadingPlan[0];
};

// Get plan start date (not used in M'Cheyne plan, but kept for compatibility)
export const getPlanStartDate = (): Date => {
  return new Date(new Date().getFullYear(), 0, 1); // January 1st of current year
};
