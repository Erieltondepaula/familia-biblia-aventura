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

// Chapter-specific notes functions
export const saveChapterNote = (profileId: string, chapterRef: string, notes: string) => {
  const key = `chapter_notes_${profileId}`;
  const existing = localStorage.getItem(key);
  const chapterNotes: ChapterNote[] = existing ? JSON.parse(existing) : [];
  
  // Remove existing note for this chapter
  const filtered = chapterNotes.filter(cn => cn.chapterRef !== chapterRef);
  
  // Add new note if not empty
  if (notes.trim()) {
    filtered.push({
      chapterRef,
      notes: notes.trim(),
      date: new Date().toISOString()
    });
  }
  
  localStorage.setItem(key, JSON.stringify(filtered));
};

export const getChapterNote = (profileId: string, chapterRef: string): string => {
  const key = `chapter_notes_${profileId}`;
  const existing = localStorage.getItem(key);
  if (!existing) return "";
  
  const chapterNotes: ChapterNote[] = JSON.parse(existing);
  const note = chapterNotes.find(cn => cn.chapterRef === chapterRef);
  return note?.notes || "";
};

export const getAllChapterNotes = (profileId: string): ChapterNote[] => {
  const key = `chapter_notes_${profileId}`;
  const existing = localStorage.getItem(key);
  return existing ? JSON.parse(existing) : [];
};
