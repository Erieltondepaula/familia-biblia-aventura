// Utility functions for progress calculations

export interface UserStats {
  level: number;
  xp: number;
  totalDaysRead: number;
  currentStreak: number;
  bibleProgress: number;
}

// Calculate level based on XP
export const calculateLevel = (xp: number): number => {
  // Every 600 XP = 1 level
  return Math.floor(xp / 600);
};

// Calculate XP needed for next level
export const xpForNextLevel = (currentXp: number): number => {
  const currentLevel = calculateLevel(currentXp);
  return (currentLevel + 1) * 600;
};

// Calculate Bible reading progress (1189 chapters total in the Bible)
export const calculateBibleProgress = (completedChapters: number): number => {
  const totalChapters = 1189;
  return Math.round((completedChapters / totalChapters) * 100 * 10) / 10;
};

// Award XP for completing daily reading
export const awardReadingXP = (): number => {
  return 50;
};

// Award XP for completing quiz
export const awardQuizXP = (correctAnswers: number, totalQuestions: number): number => {
  if (correctAnswers === totalQuestions) {
    return 100; // Perfect score bonus
  }
  return Math.floor((correctAnswers / totalQuestions) * 80);
};

// Award XP for memorizing verse
export const awardMemorizationXP = (): number => {
  return 30;
};

// Award XP for reflection
export const awardReflectionXP = (): number => {
  return 20;
};

// Get level name
export const getLevelName = (level: number): string => {
  if (level === 0) return "Iniciante";
  if (level >= 1 && level <= 20) return "Intermediário";
  if (level >= 21 && level <= 60) return "Experiente";
  if (level >= 61 && level <= 90) return "Professor";
  if (level >= 91) return "Mestre";
  return "Iniciante";
};

// Get level description
export const getLevelDescription = (level: number): string => {
  if (level === 0) return "Começando a jornada espiritual";
  if (level >= 1 && level <= 20) return "Desenvolvendo constância na leitura";
  if (level >= 21 && level <= 60) return "Conhece bem as Escrituras";
  if (level >= 61 && level <= 90) return "Capaz de ensinar a outros";
  if (level >= 91) return "Domínio profundo da Palavra";
  return "Começando a jornada espiritual";
};
