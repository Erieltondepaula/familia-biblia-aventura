import React from 'react';
import { supabase } from '@/integrations/supabase/client';

export type RoleType = "pai" | "mae" | "filho";
export type Difficulty = "crianca" | "adolescente" | "adulto";
export type BibleVersion = 'ACF' | 'NVI' | 'NTLH' | 'BKJ1611' | 'NAA';

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

export const ProfileContext = React.createContext<ProfileContextType | undefined>(undefined);

export default ProfileContext;
