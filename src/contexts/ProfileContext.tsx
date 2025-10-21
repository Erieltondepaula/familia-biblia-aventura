import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { bibleVersions } from "@/lib/bibleVersions";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
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
      if (!value) return undefined;
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
      return relaxed ? relaxed.code : undefined;
    };

    let normalizedBibleVersion = normalizeBibleVersion(String(data.bible_version)) as Profile["bible_version"];
    // fallback automático para evitar 400s no DB
    if (!isBibleCode(String(normalizedBibleVersion))) {
      logger.warn('Fallback: bible_version não pôde ser normalizada, usando NVI como padrão. Valor original:', data.bible_version);
      toast(`Versão da Bíblia inválida: '${data.bible_version}'. Usando NVI como padrão.`);
      normalizedBibleVersion = 'NVI';
    }
    const toInsert = { ...data, bible_version: normalizedBibleVersion, user_id: user.id };
    const { data: newProfile, error } = await supabase.from('profiles').insert(toInsert).select().single();
    if (error) {
      logger.error("Erro ao adicionar perfil:", error);
      const msg = error.message || 'Erro ao adicionar perfil';
      toast.error(`Erro ao salvar perfil: ${msg}`);
    }
    else if (newProfile) {
      await fetchProfiles(); // Recarrega a lista para garantir consistência
      setCurrentProfile(newProfile.id);
    }
  };

  const updateProfile = async (id: string, updates: Partial<Omit<Profile, "id" | "user_id">>) => {
    // Helpers
    const isBibleCode = (v: string): v is Profile["bible_version"] => Object.keys(bibleVersions).includes(v);
    const tryNormalize = (value?: string): Profile["bible_version"] | undefined => {
      if (!value) return undefined;
      const v = String(value).trim();
      if (isBibleCode(v)) return v;
      const compact = v.replace(/\s+/g, '');
      if (isBibleCode(compact)) return compact as Profile["bible_version"];
      const byName = Object.values(bibleVersions).find(b =>
        b.name.toLowerCase() === v.toLowerCase() || b.fullName.toLowerCase() === v.toLowerCase()
      );
      if (byName) return byName.code;
      const relaxed = Object.values(bibleVersions).find(b =>
        b.name.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase() ||
        b.fullName.replace(/\s+/g, '').toLowerCase() === v.replace(/\s+/g, '').toLowerCase()
      );
      return relaxed ? relaxed.code : undefined;
    };

    // Prepare payload and clean undefined values
    const payload: Record<string, unknown> = { ...updates };
    Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k]);

    // If bible_version is present, normalize and perform isolated update first
    if (Object.prototype.hasOwnProperty.call(payload, 'bible_version')) {
      const raw = payload.bible_version as unknown as string | undefined;
      logger.debug('[DEBUG updateProfile] raw bible_version:', raw);
      const normalized = tryNormalize(raw) || 'NVI';
      logger.debug('[DEBUG updateProfile] normalized bible_version:', normalized);
      if (!isBibleCode(normalized)) {
        // safety: ensure final is a valid code
        payload.bible_version = 'NVI';
      } else {
        payload.bible_version = normalized;
      }

      logger.debug('[DEBUG updateProfile] payload before isolated update:', JSON.stringify(payload));

      // Attempt isolated update for bible_version
  const { error: bibleErr } = await supabase.from('profiles').update({ bible_version: String(payload.bible_version) }).eq('id', id);
      if (bibleErr) {
        logger.error('Erro ao atualizar bible_version isoladamente:', bibleErr, { bible_version: payload.bible_version });
        const msg = (bibleErr.message as string) || '';
        if (msg.includes('profiles_bible_version_check') || msg.includes('violates check constraint')) {
          // Retry with fallback NVI
          const { error: retryErr } = await supabase.from('profiles').update({ bible_version: 'NVI' }).eq('id', id);
          if (retryErr) {
            toast.error('Erro ao atualizar versão da Bíblia. Contate o suporte.');
            return;
          }
          // Remove bible_version from payload so it won't be re-sent
          delete payload.bible_version;
          // Update local state with fallback
          setProfiles(prev => prev.map(p => (p.id === id ? { ...p, ...updates, bible_version: 'NVI' } as Profile : p)));
          if (currentProfile?.id === id) setCurrentProfileState(prev => prev ? { ...prev, ...updates, bible_version: 'NVI' } as Profile : null);
          toast.success('Versão inválida substituída por NVI e perfil atualizado.');
        } else {
          toast.error(`Erro ao atualizar perfil: ${bibleErr.message}`);
        }
        return;
      }
      // successful bible_version update -> remove from payload
      delete payload.bible_version;
    }

    // If other fields remain, send them in a single update
    if (Object.keys(payload).length > 0) {
      const { error } = await supabase.from('profiles').update(payload).eq('id', id);
      if (error) {
        logger.error('Erro ao atualizar perfil:', error, { payload });
        const msg = (error.message as string) || '';
        if (msg.includes('profiles_bible_version_check') || msg.includes('violates check constraint')) {
          // As a last resort, attempt to set bible_version to NVI and retry remaining fields
          const { error: retryErr } = await supabase.from('profiles').update({ bible_version: 'NVI' }).eq('id', id);
          if (!retryErr) {
            // Update local cache to reflect fallback
            setProfiles(prev => prev.map(p => (p.id === id ? { ...p, ...updates, bible_version: 'NVI' } as Profile : p)));
            if (currentProfile?.id === id) setCurrentProfileState(prev => prev ? { ...prev, ...updates, bible_version: 'NVI' } as Profile : null);
            toast.success('Versão inválida substituída por NVI e perfil atualizado.');
            return;
          }
        }
        toast.error(`Erro ao atualizar perfil: ${msg || 'Erro desconhecido'}`);
        return;
      }
    }

    // Apply updates to local state (payload may be empty if we only updated bible_version)
    setProfiles(prev => prev.map(p => (p.id === id ? { ...p, ...updates } as Profile : p)));
    if (currentProfile?.id === id) setCurrentProfileState(prev => prev ? { ...prev, ...updates } as Profile : null);
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