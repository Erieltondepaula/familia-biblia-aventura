import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateLevel, calculateBibleProgress, xpForNextLevel, getLevelName } from '@/lib/progressCalculations';
import { useProfile } from '@/contexts/ProfileContext';

interface CompletedReading {
  day: number;
  chapters: string[];
  completedAt: Date;
}

interface ProgressContextType {
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

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentProfile } = useProfile();
  const profileId = currentProfile?.id || 'default';

  const [xp, setXp] = useState<number>(0);
  const [completedReadings, setCompletedReadings] = useState<CompletedReading[]>([]);

  // Load data when profile changes
  useEffect(() => {
    const savedXp = localStorage.getItem(`userXP_${profileId}`);
    setXp(savedXp ? parseInt(savedXp) : 0);
    const savedReadings = localStorage.getItem(`completedReadings_${profileId}`);
    setCompletedReadings(savedReadings ? JSON.parse(savedReadings) : []);
  }, [profileId]);

  // Calculate derived values
  const level = calculateLevel(xp);
  const levelName = getLevelName(level);
  const totalDaysRead = completedReadings.length;
  const bibleProgress = calculateBibleProgress(completedReadings.reduce((acc, r) => acc + r.chapters.length, 0));
  const xpToNextLevel = xpForNextLevel(xp);

  // Calculate streak
  const currentStreak = React.useMemo(() => {
    if (completedReadings.length === 0) return 0;
    
    const sortedReadings = [...completedReadings].sort((a, b) => b.day - a.day);
    let streak = 1;
    
    for (let i = 0; i < sortedReadings.length - 1; i++) {
      if (sortedReadings[i].day - sortedReadings[i + 1].day === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }, [completedReadings]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(`userXP_${profileId}`, xp.toString());
  }, [xp, profileId]);

  useEffect(() => {
    localStorage.setItem(`completedReadings_${profileId}`, JSON.stringify(completedReadings));
  }, [completedReadings, profileId]);

  const markChapterAsRead = (day: number, chapters: string[]) => {
    if (completedReadings.some(r => r.day === day)) {
      return;
    }

    const newReading: CompletedReading = {
      day,
      chapters,
      completedAt: new Date()
    };

    setCompletedReadings(prev => [...prev, newReading]);
    // Award 84 XP per chapter
    addXP(chapters.length * 84);
  };

  const addXP = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const isChapterCompleted = (day: number): boolean => {
    return completedReadings.some(r => r.day === day);
  };

  const totalChaptersRead = (): number => {
    return completedReadings.reduce((acc, r) => acc + r.chapters.length, 0);
  };

  const resetProgress = () => {
    setXp(0);
    setCompletedReadings([]);
    localStorage.removeItem(`userXP_${profileId}`);
    localStorage.removeItem(`completedReadings_${profileId}`);
  };

  return (
    <ProgressContext.Provider value={{
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
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
