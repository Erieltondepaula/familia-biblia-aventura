import { useContext } from 'react';
import ProgressContext from '@/contexts/progressContextDef';
import type { ProgressContextType } from '@/contexts/progressContextDef';

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};