// Bible highlight and annotation storage
export type HighlightColor = 'yellow' | 'green' | 'red' | 'blue' | 'purple';
export type HighlightStyle = 'bold' | 'underline' | 'none';

export interface VerseHighlight {
  book: string;
  chapter: number;
  verse: number;
  profileId: string;
  color?: HighlightColor;
  style?: HighlightStyle;
  note?: string;
}

const STORAGE_KEY = 'bible_highlights';

export const saveHighlight = (highlight: VerseHighlight): void => {
  const highlights = getAllHighlights();
  const key = `${highlight.profileId}-${highlight.book}-${highlight.chapter}-${highlight.verse}`;
  highlights[key] = highlight;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
};

export const getHighlight = (
  profileId: string,
  book: string,
  chapter: number,
  verse: number
): VerseHighlight | null => {
  const highlights = getAllHighlights();
  const key = `${profileId}-${book}-${chapter}-${verse}`;
  return highlights[key] || null;
};

export const removeHighlight = (
  profileId: string,
  book: string,
  chapter: number,
  verse: number
): void => {
  const highlights = getAllHighlights();
  const key = `${profileId}-${book}-${chapter}-${verse}`;
  delete highlights[key];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(highlights));
};

export const getAllHighlights = (): Record<string, VerseHighlight> => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const getChapterHighlights = (
  profileId: string,
  book: string,
  chapter: number
): VerseHighlight[] => {
  const allHighlights = getAllHighlights();
  return Object.values(allHighlights).filter(
    h => h.profileId === profileId && h.book === book && h.chapter === chapter
  );
};
