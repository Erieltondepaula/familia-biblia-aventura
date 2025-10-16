import React from 'react';

export interface CompletedReading {
  day: number;
  chapters: string[];
  completedAt: string;
}

export interface ProgressContextType {
  xp: number;
  level: number;
  levelName: string;
  completedReadings: CompletedReading[];
  currentStreak: number;
  totalDaysRead: number;
  bibleProgress: number;
  xpToNextLevel: number;
  totalChaptersRead: () => number;
  markChapterAsRead: (day: number, chapters: string[]) => void;
  addXP: (amount: number) => void;
  isChapterCompleted: (day: number) => boolean;
  resetProgress: () => void;
}

export const ProgressContext = React.createContext<ProgressContextType | undefined>(undefined);

export default ProgressContext;
