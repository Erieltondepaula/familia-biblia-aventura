// Storage for memorized verses per profile per day
export interface MemorizedVerse {
  day: number;
  date: string;
}

export const markVerseAsMemorized = (profileId: string, day: number): void => {
  const key = `memorizedVerses_${profileId}`;
  const existing = localStorage.getItem(key);
  const memorized: MemorizedVerse[] = existing ? JSON.parse(existing) : [];
  
  // Check if already memorized for this day
  if (memorized.some(m => m.day === day)) {
    return;
  }
  
  // Add new memorization
  memorized.push({
    day,
    date: new Date().toISOString()
  });
  
  localStorage.setItem(key, JSON.stringify(memorized));
};

export const isVerseMemorized = (profileId: string, day: number): boolean => {
  const key = `memorizedVerses_${profileId}`;
  const existing = localStorage.getItem(key);
  if (!existing) return false;
  
  const memorized: MemorizedVerse[] = JSON.parse(existing);
  return memorized.some(m => m.day === day);
};
