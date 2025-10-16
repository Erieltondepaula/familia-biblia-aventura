import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { bibleVersions } from "@/lib/bibleVersions";
import { toast } from "sonner";
import ProfileContextDef, { Profile, ProfileContextType } from "./profileContextDef";

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
    // Garantir que salvamos o código correto da versão da bíblia (ex: 'BKJ1611')
    const isBibleCode = (v: string): v is Profile["bible_version"] => Object.keys(bibleVersions).includes(v);

    const normalizeBibleVersion = (value?: string) => {
      if (!value) return value;
      const v = String(value).trim();
      // valor já é um código válido?
      if (isBibleCode(v)) return v;
      // tentar remover espaços (ex: 'BKJ 1611' -> 'BKJ1611')
      const removedSpaces = v.replace(/\s+/g, '');
      if (isBibleCode(removedSpaces)) return removedSpaces;
      // procurar por name ou fullName (case-insensitive)
      const byName = Object.values(bibleVersions).find(b =>
        b.name.toLowerCase() === v.toLowerCase() || b.fullName.toLowerCase() === v.toLowerCase()
      );
      if (byName) return byName.code;
      // tentar matches relaxados (ignoring spaces and case)
      const relaxed = Object.values(bibleVersions).find(b =>
        b.name.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase() ||
        b.fullName.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase()
      );
      return relaxed ? relaxed.code : value;
    };

    let normalizedBibleVersion = normalizeBibleVersion(String(data.bible_version)) as Profile["bible_version"];
    // fallback automático para evitar 400s no DB
    if (!isBibleCode(String(normalizedBibleVersion))) {
      console.warn('Fallback: bible_version não pôde ser normalizada, usando NVI como padrão. Valor original:', data.bible_version);
      toast(`Versão da Bíblia inválida: '${data.bible_version}'. Usando NVI como padrão.`);
      normalizedBibleVersion = 'NVI';
    }
    const toInsert = { ...data, bible_version: normalizedBibleVersion, user_id: user.id };
    const { data: newProfile, error } = await supabase.from('profiles').insert(toInsert).select().single();
    if (error) {
      console.error("Erro ao adicionar perfil:", error);
      const msg = error.message || 'Erro ao adicionar perfil';
      toast.error(`Erro ao salvar perfil: ${msg}`);
    }
    else if (newProfile) {
      await fetchProfiles(); // Recarrega a lista para garantir consistência
      setCurrentProfile(newProfile.id);
    }
  };

  const updateProfile = async (id: string, updates: Partial<Omit<Profile, "id" | "user_id">>) => {
    // Normalizar bible_version se presente
    const isBibleCode = (v: string): v is Profile["bible_version"] => Object.keys(bibleVersions).includes(v);
    const normalizeBibleVersion = (value?: string) => {
      if (!value) return value;
      const v = String(value).trim();
      if (isBibleCode(v)) return v;
      const removedSpaces = v.replace(/\s+/g, '');
      if (isBibleCode(removedSpaces)) return removedSpaces;
      const byName = Object.values(bibleVersions).find(b =>
        b.name.toLowerCase() === v.toLowerCase() || b.fullName.toLowerCase() === v.toLowerCase()
      );
      if (byName) return byName.code;
      const relaxed = Object.values(bibleVersions).find(b =>
        b.name.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase() ||
        b.fullName.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase()
      );
      return relaxed ? relaxed.code : value;
    };

    let updatesToSend = { ...updates } as typeof updates;
    if (updates.bible_version) {
      updatesToSend = { ...updatesToSend, bible_version: normalizeBibleVersion(String(updates.bible_version)) as Profile["bible_version"] };
    }

    // Debug: log the payload being sent to Supabase
    console.debug('Profile update payload:', updatesToSend);

    // If normalization didn't produce a valid code, fallback to NVI to avoid DB errors
    if (updatesToSend.bible_version && !isBibleCode(String(updatesToSend.bible_version))) {
      console.warn('Fallback on update: invalid bible_version, using NVI. Original:', updatesToSend.bible_version);
      toast(`Versão da Bíblia inválida: '${updatesToSend.bible_version}'. Usando NVI como padrão.`);
      updatesToSend = { ...updatesToSend, bible_version: 'NVI' } as typeof updatesToSend;
    }

    const { error } = await supabase.from('profiles').update(updatesToSend).eq('id', id);
    if (error) {
      console.error("Erro ao atualizar perfil:", error);
      const msg = (error.message as string) || 'Erro ao atualizar perfil';
      // Mensagem específica para violação do CHECK
      if (msg.includes('profiles_bible_version_check') || msg.includes('violates check constraint')) {
        toast.error('Versão da Bíblia inválida. Por favor, selecione uma versão suportada.');
      } else {
        toast.error(`Erro ao atualizar perfil: ${msg}`);
      }
    }
    else {
      setProfiles(prev => prev.map(p => (p.id === id ? { ...p, ...updatesToSend } as Profile : p)));
      if (currentProfile?.id === id) {
        setCurrentProfileState(prev => prev ? { ...prev, ...updatesToSend } as Profile : null);
      }
    }
  };

  const deleteProfile = async (id: string) => {
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) {
      console.error("Erro ao deletar perfil:", error);
      toast.error('Erro ao deletar perfil.');
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
    <ProfileContextDef.Provider value={{ profiles, currentProfile, loading, setCurrentProfile, addProfile, updateProfile, deleteProfile }}>
      {children}
    </ProfileContextDef.Provider>
  );
};