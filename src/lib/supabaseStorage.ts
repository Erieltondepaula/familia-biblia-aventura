import { supabase } from '@/integrations/supabase/client';

// ============= PROGRESSO DE LEITURA =============

export interface ReadingProgress {
  id: string;
  profile_id: string;
  day: number;
  chapters: string[];
  completed_at: string;
  xp_earned: number;
}

export const saveReadingProgress = async (profileId: string, day: number, chapters: string[], xpEarned: number) => {
  const { data, error } = await supabase
    .from('reading_progress')
    .upsert({
      profile_id: profileId,
      day,
      chapters,
      xp_earned: xpEarned,
      completed_at: new Date().toISOString()
    }, {
      onConflict: 'profile_id,day'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao salvar progresso de leitura:', error);
    throw error;
  }
  return data;
};

export const getReadingProgress = async (profileId: string): Promise<ReadingProgress[]> => {
  const { data, error } = await supabase
    .from('reading_progress')
    .select('*')
    .eq('profile_id', profileId)
    .order('day', { ascending: true });
  
  if (error) {
    console.error('Erro ao buscar progresso de leitura:', error);
    return [];
  }
  return data || [];
};

// ============= ANOTAÇÕES POR CAPÍTULO =============

export interface ChapterNote {
  id: string;
  profile_id: string;
  chapter_ref: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export const saveChapterNote = async (profileId: string, chapterRef: string, notes: string) => {
  if (!notes.trim()) {
    // Se a nota estiver vazia, deletar
    const { error } = await supabase
      .from('chapter_notes')
      .delete()
      .eq('profile_id', profileId)
      .eq('chapter_ref', chapterRef);
    
    if (error) console.error('Erro ao deletar anotação:', error);
    return;
  }

  const { data, error } = await supabase
    .from('chapter_notes')
    .upsert({
      profile_id: profileId,
      chapter_ref: chapterRef,
      notes: notes.trim()
    }, {
      onConflict: 'profile_id,chapter_ref'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao salvar anotação:', error);
    throw error;
  }
  return data;
};

export const getChapterNote = async (profileId: string, chapterRef: string): Promise<string> => {
  const { data, error } = await supabase
    .from('chapter_notes')
    .select('notes')
    .eq('profile_id', profileId)
    .eq('chapter_ref', chapterRef)
    .maybeSingle();
  
  if (error) {
    console.error('Erro ao buscar anotação:', error);
    return '';
  }
  return data?.notes || '';
};

export const getAllChapterNotes = async (profileId: string): Promise<ChapterNote[]> => {
  const { data, error } = await supabase
    .from('chapter_notes')
    .select('*')
    .eq('profile_id', profileId)
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Erro ao buscar todas as anotações:', error);
    return [];
  }
  return data || [];
};

// ============= VERSÍCULOS MEMORIZADOS =============

export interface MemorizedVerse {
  id: string;
  profile_id: string;
  day: number;
  memorized_at: string;
}

export const markVerseAsMemorized = async (profileId: string, day: number) => {
  const { data, error } = await supabase
    .from('memorized_verses')
    .upsert({
      profile_id: profileId,
      day,
      memorized_at: new Date().toISOString()
    }, {
      onConflict: 'profile_id,day'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao marcar versículo como memorizado:', error);
    throw error;
  }
  return data;
};

export const isVerseMemorized = async (profileId: string, day: number): Promise<boolean> => {
  const { data, error } = await supabase
    .from('memorized_verses')
    .select('id')
    .eq('profile_id', profileId)
    .eq('day', day)
    .maybeSingle();
  
  if (error) {
    console.error('Erro ao verificar versículo memorizado:', error);
    return false;
  }
  return !!data;
};

// ============= ESTATÍSTICAS DO PERFIL =============

export interface ProfileStats {
  id: string;
  profile_id: string;
  total_xp: number;
  level: number;
  current_streak: number;
  updated_at: string;
}

export const getProfileStats = async (profileId: string): Promise<ProfileStats | null> => {
  const { data, error } = await supabase
    .from('profile_stats')
    .select('*')
    .eq('profile_id', profileId)
    .maybeSingle();
  
  if (error) {
    console.error('Erro ao buscar estatísticas do perfil:', error);
    return null;
  }
  return data;
};

export const updateProfileStats = async (profileId: string, updates: Partial<Omit<ProfileStats, 'id' | 'profile_id'>>) => {
  const { data, error } = await supabase
    .from('profile_stats')
    .update(updates)
    .eq('profile_id', profileId)
    .select()
    .single();
  
  if (error) {
    console.error('Erro ao atualizar estatísticas do perfil:', error);
    throw error;
  }
  return data;
};

export const addXPToProfile = async (profileId: string, xpToAdd: number) => {
  const currentStats = await getProfileStats(profileId);
  if (!currentStats) {
    console.error('Estatísticas do perfil não encontradas');
    return;
  }

  const newTotalXP = currentStats.total_xp + xpToAdd;
  const newLevel = Math.floor(newTotalXP / 1000); // 1000 XP por nível

  return updateProfileStats(profileId, {
    total_xp: newTotalXP,
    level: Math.min(newLevel, 100) // Max level 100
  });
};

// ============= FUNÇÕES AUXILIARES DE DEVOCIONAIS =============

export const getDevotionalProgress = async (profileId: string, day: number): Promise<boolean> => {
  const { data, error } = await supabase
    .from('devotional_progress')
    .select('id')
    .eq('profile_id', profileId)
    .eq('day', day)
    .maybeSingle();

  if (error) {
    console.error('Erro ao verificar devocional:', error);
    return false;
  }
  return !!data;
};
