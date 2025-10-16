import { useContext } from 'react';
import { ProfileContext } from '@/contexts/profileContextDef';
import type { ProfileContextType } from '@/contexts/profileContextDef';

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};