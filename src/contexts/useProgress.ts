import { useContext } from 'react';
import ProgressContextDef, { ProgressContextType } from './progressContextDef';

export const useProgress = (): ProgressContextType => {
  const context = useContext(ProgressContextDef);
  if (!context) throw new Error('useProgress must be used within a ProgressProvider');
  return context;
};

export default useProgress;
