import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { calculateLevel, calculateBibleProgress, xpForNextLevel, getLevelName } from '@/lib/progressCalculations';
import { useProfile } from '@/hooks/useProfile';

interface CompletedReading {
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

export const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentProfile } = useProfile();
  const profileId = currentProfile?.id;

  const [xp, setXp] = useState<number>(0);
  const [completedReadings, setCompletedReadings] = useState<CompletedReading[]>([]);

  useEffect(() => {
    if (profileId) {
      const savedXp = localStorage.getItem(`userXP_${profileId}`);
      setXp(savedXp ? parseInt(savedXp, 10) : 0);
      const savedReadings = localStorage.getItem(`completedReadings_${profileId}`);
      setCompletedReadings(savedReadings ? JSON.parse(savedReadings) : []);
    } else {
      setXp(0);
      setCompletedReadings([]);
    }
  }, [profileId]);

  const level = calculateLevel(xp);
  const levelName = getLevelName(level);
  const totalDaysRead = completedReadings.length;
  const xpToNextLevel = xpForNextLevel(xp);

  const totalChaptersRead = (): number => completedReadings.reduce((acc, r) => acc + r.chapters.length, 0);
  const bibleProgress = calculateBibleProgress(totalChaptersRead());

  const currentStreak = useMemo(() => {
    if (completedReadings.length === 0) return 0;

    const sortedReadings = [...completedReadings].sort(
      (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const mostRecentReadingDate = new Date(sortedReadings[0].completedAt);
    mostRecentReadingDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((today.getTime() - mostRecentReadingDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays > 1) return 0;

    let streak = 1;
    for (let i = 0; i < sortedReadings.length - 1; i++) {
      const currentDate = new Date(sortedReadings[i].completedAt);
      const previousDate = new Date(sortedReadings[i + 1].completedAt);
      currentDate.setHours(0, 0, 0, 0);
      previousDate.setHours(0, 0, 0, 0);

      const dayDiff = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

      if (dayDiff === 1) streak++;
      else if (dayDiff > 1) break;
    }

    return streak;
  }, [completedReadings]);

  const saveProgress = (newXp: number, newReadings: CompletedReading[]) => {
    if (!profileId) return;
    localStorage.setItem(`userXP_${profileId}`, newXp.toString());
    localStorage.setItem(`completedReadings_${profileId}`, JSON.stringify(newReadings));
  };

  const markChapterAsRead = (day: number, chapters: string[]) => {
    if (completedReadings.some(r => r.day === day) || !profileId) return;

    const newReading: CompletedReading = { day, chapters, completedAt: new Date().toISOString() };
    const newReadings = [...completedReadings, newReading];
    const newXp = xp + chapters.length * 84;

    setCompletedReadings(newReadings);
    setXp(newXp);
    saveProgress(newXp, newReadings);
  };

  const addXP = (amount: number) => {
    if (!profileId) return;
    const newXp = xp + amount;
    setXp(newXp);
    saveProgress(newXp, completedReadings);
  };

  const isChapterCompleted = (day: number): boolean => completedReadings.some(r => r.day === day);

  const resetProgress = () => {
    if (!profileId) return;
    setXp(0);
    setCompletedReadings([]);
    localStorage.removeItem(`userXP_${profileId}`);
    localStorage.removeItem(`completedReadings_${profileId}`);
  };

  return (
    <ProgressContext.Provider
      value={{
        xp,
        level,
        levelName,
        completedReadings,
        currentStreak,
        totalDaysRead,
        bibleProgress,
        xpToNextLevel,
        totalChaptersRead,
        markChapterAsRead,
        addXP,
        isChapterCompleted,
        resetProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

// ✅ Hook useProgress integrado
export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used within a ProgressProvider");
  return context;
};
