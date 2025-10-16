import React, { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AuthContextDef, { AuthContextType } from './authContextDef';
import { Session, User } from '@supabase/supabase-js';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = { session, user, loading, signOut } as AuthContextType;

  return (
    <AuthContextDef.Provider value={value}>
      {!loading && children}
    </AuthContextDef.Provider>
  );
};