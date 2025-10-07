import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type RoleType = "pai" | "mae" | "filho";
export type Difficulty = "crianca" | "adolescente" | "adulto";
export type BibleVersion = "ACF" | "NVI" | "NTLH";

export interface Profile {
  id: string;
  name: string;
  age: number;
  role: RoleType;
  difficulty: Difficulty;
  color?: string;
  bibleVersion: BibleVersion;
}

interface ProfileContextType {
  profiles: Profile[];
  currentProfile: Profile | null;
  setCurrentProfile: (id: string) => void;
  addProfile: (data: Omit<Profile, "id">) => void;
  updateProfile: (id: string, updates: Partial<Profile>) => void;
  deleteProfile: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within a ProfileProvider");
  return ctx;
};

const defaultProfile: Profile = {
  id: "default",
  name: "Você",
  age: 30,
  role: "pai",
  difficulty: "adulto",
  color: "#1E90FF",
  bibleVersion: "NVI",
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const saved = localStorage.getItem("profiles");
    return saved ? JSON.parse(saved) : [defaultProfile];
  });
  const [currentId, setCurrentId] = useState<string>(() => {
    const saved = localStorage.getItem("currentProfileId");
    return saved || profiles[0]?.id || defaultProfile.id;
  });

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    localStorage.setItem("currentProfileId", currentId);
  }, [currentId]);

  const currentProfile = useMemo(
    () => profiles.find(p => p.id === currentId) || profiles[0] || null,
    [profiles, currentId]
  );

  const setCurrentProfile = (id: string) => setCurrentId(id);

  const addProfile = (data: Omit<Profile, "id">) => {
    const id = crypto.randomUUID?.() || String(Date.now());
    const profile: Profile = { id, ...data };
    setProfiles(prev => [...prev, profile]);
    setCurrentId(id);
  };

  const updateProfile = (id: string, updates: Partial<Profile>) => {
    setProfiles(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
    if (currentId === id) {
      const remaining = profiles.filter(p => p.id !== id);
      setCurrentId(remaining[0]?.id || defaultProfile.id);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profiles, currentProfile, setCurrentProfile, addProfile, updateProfile, deleteProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};