// Utility functions for progress calculations

export interface UserStats {
  level: number;
  xp: number;
  totalDaysRead: number;
  currentStreak: number;
  bibleProgress: number;
}

// Calculate level based on XP (100 levels total, 1000 XP per level)
export const calculateLevel = (xp: number): number => {
  const level = Math.floor(xp / 1000);
  return Math.min(level, 100); // Max level 100
};

// Calculate XP needed for next level
export const xpForNextLevel = (currentXp: number): number => {
  const currentLevel = calculateLevel(currentXp);
  if (currentLevel >= 100) return 100000; // Max XP
  return (currentLevel + 1) * 1000;
};

// Calculate Bible reading progress (1189 chapters total in the Bible)
export const calculateBibleProgress = (completedChapters: number): number => {
  const totalChapters = 1189;
  return Math.round((completedChapters / totalChapters) * 100 * 10) / 10;
};

// Award XP for completing daily reading (84 XP per chapter)
export const awardReadingXP = (chaptersCount: number = 1): number => {
  return chaptersCount * 84;
};

// Award XP for completing quiz
export const awardQuizXP = (correctAnswers: number, totalQuestions: number): number => {
  if (correctAnswers === totalQuestions) {
    return 150; // Perfect score bonus
  }
  return Math.floor((correctAnswers / totalQuestions) * 100);
};

// Award XP for memorizing verse
export const awardMemorizationXP = (): number => {
  return 100;
};

// Award XP for reflection
export const awardReflectionXP = (): number => {
  return 50;
};

// Award XP for completing a book
export const awardBookCompletionXP = (): number => {
  return 250;
};

// Award XP for completing a doctrinal theme
export const awardThemeCompletionXP = (): number => {
  return 500;
};

// Award XP for completing Old or New Testament
export const awardTestamentCompletionXP = (): number => {
  return 1000;
};

// Get level name (titles based on new system)
export const getLevelName = (level: number): string => {
  if (level === 0) return "Iniciante";
  if (level >= 1 && level <= 10) return "Aprendiz da Palavra";
  if (level >= 11 && level <= 30) return "Discípulo Fiel";
  if (level >= 31 && level <= 60) return "Servo Experiente";
  if (level >= 61 && level <= 90) return "Mestre da Escritura";
  if (level >= 91 && level <= 100) return "Doutor da Fé";
  return "Iniciante";
};

// Get level description
export const getLevelDescription = (level: number): string => {
  if (level === 0) return "Começando a jornada espiritual";
  if (level >= 1 && level <= 10) return "Aprendendo os fundamentos da Palavra";
  if (level >= 11 && level <= 30) return "Desenvolvendo constância e disciplina";
  if (level >= 31 && level <= 60) return "Conhecimento profundo das Escrituras";
  if (level >= 61 && level <= 90) return "Capaz de ensinar e discipular";
  if (level >= 91 && level <= 100) return "Domínio completo da Palavra de Deus";
  return "Começando a jornada espiritual";
};
