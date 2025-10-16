import React, { createContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// As definições de tipos e o contexto agora são exportadas daqui
export type RoleType = "pai" | "mae" | "filho";
export type Difficulty = "crianca" | "adolescente" | "adulto";
export type BibleVersion = "ACF" | "NVI" | "NTLH" | "BKJ";

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  age: number;
  role: RoleType;
  difficulty: Difficulty;
  bible_version: BibleVersion;
  avatar_url?: string | null;
}

export interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  loading: boolean;
  setCurrentProfile: (id: string) => void;
  addProfile: (data: Omit<Profile, "id" | "user_id" | "avatar_url">) => Promise<void>;
  updateProfile: (id: string, updates: Partial<Omit<Profile, "id" | "user_id">>) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// O componente Provider continua aqui
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfileState] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = useCallback(async () => {
    if (!user) {
      setProfiles([]);
      setCurrentProfileState(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id);
    if (error) {
      console.error("Erro ao buscar perfis:", error);
      setProfiles([]);
    } else if (data) {
      setProfiles(data as Profile[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  useEffect(() => {
    if (profiles.length > 0 && !currentProfile) {
      const savedProfileId = localStorage.getItem('currentProfileId');
      const profileToSet = profiles.find(p => p.id === savedProfileId) || profiles[0];
      setCurrentProfileState(profileToSet);
    } else if (profiles.length === 0) {
      setCurrentProfileState(null);
    }
  }, [profiles, currentProfile]);

  const setCurrentProfile = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    if (profile) {
      setCurrentProfileState(profile);
      localStorage.setItem('currentProfileId', id);
    }
  };

  const addProfile = async (data: Omit<Profile, "id" | "user_id" | "avatar_url">) => {
    if (!user) return;
    const { data: newProfile, error } = await supabase.from('profiles').insert({ ...data, user_id: user.id }).select().single();
    if (error) console.error("Erro ao adicionar perfil:", error);
    else if (newProfile) {
      await fetchProfiles(); // Recarrega a lista para garantir consistência
      setCurrentProfile(newProfile.id);
    }
  };

  const updateProfile = async (id: string, updates: Partial<Omit<Profile, "id" | "user_id">>) => {
    const { error } = await supabase.from('profiles').update(updates).eq('id', id);
    if (error) console.error("Erro ao atualizar perfil:", error);
    else {
      setProfiles(prev => prev.map(p => (p.id === id ? { ...p, ...updates } as Profile : p)));
      if (currentProfile?.id === id) {
        setCurrentProfileState(prev => prev ? { ...prev, ...updates } as Profile : null);
      }
    }
  };

  const deleteProfile = async (id: string) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) {
      console.error("Erro ao deletar perfil:", error);
    } else {
      const newProfiles = profiles.filter(p => p.id !== id);
      setProfiles(newProfiles);
      if (currentProfile?.id === id) {
        const nextProfile = newProfiles[0] || null;
        setCurrentProfileState(nextProfile);
        if (nextProfile) {
          localStorage.setItem('currentProfileId', nextProfile.id);
        } else {
          localStorage.removeItem('currentProfileId');
        }
      }
    }
  };

  return (
    <ProfileContext.Provider value={{ profiles, currentProfile, loading, setCurrentProfile, addProfile, updateProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};