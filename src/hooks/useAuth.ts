import { useContext } from 'react';
import AuthContextDef, { AuthContextType } from '@/contexts/authContextDef';

export const useAuth = () => {
  const context = useContext(AuthContextDef);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context as AuthContextType;
};