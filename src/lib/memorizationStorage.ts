// Storage for memorized verses per profile per day
export interface MemorizedVerse {
  day: number;
  date: string; // ISO date string for the day it was memorized
}

export const markVerseAsMemorized = (profileId: string, day: number): void => {
  const key = `memorizedVerses_${profileId}`;
  const existing = localStorage.getItem(key);
  const memorized: MemorizedVerse[] = existing ? JSON.parse(existing) : [];
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Remove old memorization for this day (if exists)
  const filtered = memorized.filter(m => m.day !== day);
  
  // Add new memorization with today's date
  filtered.push({
    day,
    date: todayString
  });
  
  localStorage.setItem(key, JSON.stringify(filtered));
};

export const isVerseMemorized = (profileId: string, day: number): boolean => {
  const key = `memorizedVerses_${profileId}`;
  const existing = localStorage.getItem(key);
  if (!existing) return false;
  
  const memorized: MemorizedVerse[] = JSON.parse(existing);
  const verse = memorized.find(m => m.day === day);
  
  if (!verse) return false;
  
  // Check if it was memorized today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD
  
  return verse.date === todayString;
};
