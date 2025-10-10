import { useContext } from 'react';
import { ProgressContext } from '@/contexts/ProgressContext';
import type { ProgressContextType } from '@/contexts/ProgressContext';

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};