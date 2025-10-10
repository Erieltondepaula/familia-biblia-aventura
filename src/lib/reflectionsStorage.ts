// Storage for user reflections per profile
export interface Reflection {
  day: number;
  notes: string;
  date: string;
}

// Storage for chapter-specific notes
export interface ChapterNote {
  chapterRef: string;
  notes: string;
  date: string;
}

import { 
  saveChapterNote as saveChapterNoteSupabase, 
  getChapterNote as getChapterNoteSupabase,
  getAllChapterNotes as getAllChapterNotesSupabase
} from './supabaseStorage';

export const saveReflection = (profileId: string, day: number, notes: string) => {
  const key = `reflections_${profileId}`;
  const existing = localStorage.getItem(key);
  const reflections: Reflection[] = existing ? JSON.parse(existing) : [];
  
  // Remove existing reflection for this day
  const filtered = reflections.filter(r => r.day !== day);
  
  // Add new reflection
  if (notes.trim()) {
    filtered.push({
      day,
      notes: notes.trim(),
      date: new Date().toISOString()
    });
  }
  
  localStorage.setItem(key, JSON.stringify(filtered));
};

export const getReflection = (profileId: string, day: number): string => {
  const key = `reflections_${profileId}`;
  const existing = localStorage.getItem(key);
  if (!existing) return "";
  
  const reflections: Reflection[] = JSON.parse(existing);
  const reflection = reflections.find(r => r.day === day);
  return reflection?.notes || "";
};

export const getAllReflections = (profileId: string): Reflection[] => {
  const key = `reflections_${profileId}`;
  const existing = localStorage.getItem(key);
  return existing ? JSON.parse(existing) : [];
};

// Chapter-specific notes functions - usar Supabase
export const saveChapterNote = async (profileId: string, chapterRef: string, notes: string) => {
  return saveChapterNoteSupabase(profileId, chapterRef, notes);
};

export const getChapterNote = async (profileId: string, chapterRef: string): Promise<string> => {
  return getChapterNoteSupabase(profileId, chapterRef);
};

export const getAllChapterNotes = async (profileId: string) => {
  return getAllChapterNotesSupabase(profileId);
};
