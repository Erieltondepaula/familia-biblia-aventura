// Storage for user reflections per profile
export interface Reflection {
  day: number;
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
