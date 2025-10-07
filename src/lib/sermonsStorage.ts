// Sermons storage and management
export interface SermonPoint {
  title: string;
  development: string;
  affirmation: string;
  citation: string;
  references: string;
  catchPhrase: string;
  application: string;
  transition: string;
}

export interface Sermon {
  id: string;
  profileId: string;
  title: string;
  theme: string;
  textBase: string;
  date: string;
  preacher: string;
  introduction: string;
  point1: SermonPoint;
  point2: SermonPoint;
  point3: SermonPoint;
  point4: SermonPoint;
  conclusion: string;
  prayer: string;
  appeal: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'sermons';

export const saveSermon = (sermon: Omit<Sermon, 'id' | 'createdAt' | 'updatedAt'>): Sermon => {
  const sermons = getAllSermons();
  const newSermon: Sermon = {
    ...sermon,
    id: crypto.randomUUID?.() || String(Date.now()),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  sermons.push(newSermon);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sermons));
  return newSermon;
};

export const updateSermon = (id: string, updates: Partial<Omit<Sermon, 'id' | 'createdAt'>>): void => {
  const sermons = getAllSermons();
  const index = sermons.findIndex(s => s.id === id);
  
  if (index !== -1) {
    sermons[index] = {
      ...sermons[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sermons));
  }
};

export const deleteSermon = (id: string): void => {
  const sermons = getAllSermons();
  const filtered = sermons.filter(s => s.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getSermon = (id: string): Sermon | null => {
  const sermons = getAllSermons();
  return sermons.find(s => s.id === id) || null;
};

export const getAllSermons = (): Sermon[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getSermonsByProfile = (profileId: string): Sermon[] => {
  return getAllSermons().filter(s => s.profileId === profileId);
};

export const searchSermons = (profileId: string, query: string): Sermon[] => {
  const sermons = getSermonsByProfile(profileId);
  const lowerQuery = query.toLowerCase();
  
  return sermons.filter(s => 
    s.title.toLowerCase().includes(lowerQuery) ||
    s.preacher.toLowerCase().includes(lowerQuery) ||
    s.textBase.toLowerCase().includes(lowerQuery) ||
    s.theme.toLowerCase().includes(lowerQuery) ||
    s.introduction.toLowerCase().includes(lowerQuery) ||
    s.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
