import React, { useContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import ProgressContextDef, { ProgressContextType, CompletedReading } from './progressContextDef';
import { calculateLevel, calculateBibleProgress, xpForNextLevel, getLevelName } from '@/lib/progressCalculations';
import { useProfile } from '@/hooks/useProfile';
import { 
  getReadingProgress, 
  saveReadingProgress, 
  getProfileStats, 
  updateProfileStats,
  addXPToProfile 
} from '@/lib/supabaseStorage';



export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentProfile } = useProfile();
  const profileId = currentProfile?.id;

  const [xp, setXp] = useState<number>(0);
  const [completedReadings, setCompletedReadings] = useState<CompletedReading[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar progresso do Supabase
  const loadProgress = useCallback(async () => {
    if (!profileId) {
      setXp(0);
      setCompletedReadings([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Buscar estatísticas do perfil
      const stats = await getProfileStats(profileId);
      if (stats) {
        setXp(stats.total_xp);
      }

      // Buscar progresso de leitura
      const readings = await getReadingProgress(profileId);
      const formattedReadings: CompletedReading[] = readings.map(r => ({
        day: r.day,
        chapters: r.chapters,
        completedAt: r.completed_at
      }));
      setCompletedReadings(formattedReadings);
    } catch (error) {
      console.error('Erro ao carregar progresso:', error);
    }
    setLoading(false);
  }, [profileId]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

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

  const markChapterAsRead = async (day: number, chapters: string[]) => {
    if (completedReadings.some(r => r.day === day) || !profileId) return;

    const xpEarned = chapters.length * 84;
    
    try {
      // Salvar progresso no Supabase
      await saveReadingProgress(profileId, day, chapters, xpEarned);
      await addXPToProfile(profileId, xpEarned);

      // Atualizar estado local
      const newReading: CompletedReading = { 
        day, 
        chapters, 
        completedAt: new Date().toISOString() 
      };
      const newReadings = [...completedReadings, newReading];
      const newXp = xp + xpEarned;

      setCompletedReadings(newReadings);
      setXp(newXp);
    } catch (error) {
      console.error('Erro ao marcar capítulo como lido:', error);
      throw error;
    }
  };

  const addXP = async (amount: number) => {
    if (!profileId) return;
    
    try {
      await addXPToProfile(profileId, amount);
      setXp(prev => prev + amount);
    } catch (error) {
      console.error('Erro ao adicionar XP:', error);
      throw error;
    }
  };

  const isChapterCompleted = (day: number): boolean => completedReadings.some(r => r.day === day);

  const resetProgress = async () => {
    if (!profileId) return;
    
    try {
      await updateProfileStats(profileId, {
        total_xp: 0,
        level: 0,
        current_streak: 0
      });
      
      setXp(0);
      setCompletedReadings([]);
    } catch (error) {
      console.error('Erro ao resetar progresso:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <ProgressContextDef.Provider
        value={{
          xp: 0,
          level: 0,
          levelName: 'Iniciante',
          completedReadings: [],
          currentStreak: 0,
          totalDaysRead: 0,
          bibleProgress: 0,
          xpToNextLevel: 1000,
          totalChaptersRead: () => 0,
          markChapterAsRead: async () => {},
          addXP: async () => {},
          isChapterCompleted: () => false,
          resetProgress: async () => {}
        }}
      >
        {children}
      </ProgressContextDef.Provider>
    );
  }

  return (
    <ProgressContextDef.Provider
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
    </ProgressContextDef.Provider>
  );
};

// Hook moved to src/contexts/useProgress.ts to satisfy react-refresh rule (file now only exports components)
