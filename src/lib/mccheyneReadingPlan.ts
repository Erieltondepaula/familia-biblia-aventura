// Robert M'Cheyne Bible Reading Plan
// Complete annual Bible reading plan with 4 chapters per day
// Organized by calendar date (month-day)

export interface McCheyneReading {
  day: number; // Day of year (1-365)
  month: number; // 1-12
  dayOfMonth: number; // 1-31
  familyOT: string;
  familyNT: string;
  personalOT: string;
  personalNT: string;
  morningVerse: string;
  morningDevotional: string;
  eveningVerse: string;
  eveningDevotional: string;
  reflection: string;
}

// Helper to get all chapters as array
export const getAllChapters = (reading: McCheyneReading): string[] => {
  return [
    reading.familyOT,
    reading.familyNT,
    reading.personalOT,
    reading.personalNT
  ];
};

// Complete M'Cheyne plan for 365 days
export const mcCheyneReadingPlan: McCheyneReading[] = [
  // JANEIRO
  { day: 1, month: 1, dayOfMonth: 1, familyOT: "Gênesis 1", familyNT: "Mateus 1", personalOT: "Esdras 1", personalNT: "Atos 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 2, month: 1, dayOfMonth: 2, familyOT: "Gênesis 2", familyNT: "Mateus 2", personalOT: "Esdras 2", personalNT: "Atos 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 3, month: 1, dayOfMonth: 3, familyOT: "Gênesis 3", familyNT: "Mateus 3", personalOT: "Esdras 3", personalNT: "Atos 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 4, month: 1, dayOfMonth: 4, familyOT: "Gênesis 4", familyNT: "Mateus 4", personalOT: "Esdras 4", personalNT: "Atos 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 5, month: 1, dayOfMonth: 5, familyOT: "Gênesis 5", familyNT: "Mateus 5", personalOT: "Esdras 5", personalNT: "Atos 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 6, month: 1, dayOfMonth: 6, familyOT: "Gênesis 6", familyNT: "Mateus 6", personalOT: "Esdras 6", personalNT: "Atos 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 7, month: 1, dayOfMonth: 7, familyOT: "Gênesis 7", familyNT: "Mateus 7", personalOT: "Esdras 7", personalNT: "Atos 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 8, month: 1, dayOfMonth: 8, familyOT: "Gênesis 8", familyNT: "Mateus 8", personalOT: "Esdras 8", personalNT: "Atos 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 9, month: 1, dayOfMonth: 9, familyOT: "Gênesis 9-10", familyNT: "Mateus 9", personalOT: "Esdras 9", personalNT: "Atos 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 10, month: 1, dayOfMonth: 10, familyOT: "Gênesis 11", familyNT: "Mateus 10", personalOT: "Esdras 10", personalNT: "Atos 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 11, month: 1, dayOfMonth: 11, familyOT: "Gênesis 12", familyNT: "Mateus 11", personalOT: "Neemias 1", personalNT: "Atos 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 12, month: 1, dayOfMonth: 12, familyOT: "Gênesis 13", familyNT: "Mateus 12", personalOT: "Neemias 2", personalNT: "Atos 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 13, month: 1, dayOfMonth: 13, familyOT: "Gênesis 14", familyNT: "Mateus 13", personalOT: "Neemias 3", personalNT: "Atos 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 14, month: 1, dayOfMonth: 14, familyOT: "Gênesis 15", familyNT: "Mateus 14", personalOT: "Neemias 4", personalNT: "Atos 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 15, month: 1, dayOfMonth: 15, familyOT: "Gênesis 16", familyNT: "Mateus 15", personalOT: "Neemias 5", personalNT: "Atos 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 16, month: 1, dayOfMonth: 16, familyOT: "Gênesis 17", familyNT: "Mateus 16", personalOT: "Neemias 6", personalNT: "Atos 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 17, month: 1, dayOfMonth: 17, familyOT: "Gênesis 18", familyNT: "Mateus 17", personalOT: "Neemias 7", personalNT: "Atos 17", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 18, month: 1, dayOfMonth: 18, familyOT: "Gênesis 19", familyNT: "Mateus 18", personalOT: "Neemias 8", personalNT: "Atos 18", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 19, month: 1, dayOfMonth: 19, familyOT: "Gênesis 20", familyNT: "Mateus 19", personalOT: "Neemias 9", personalNT: "Atos 19", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 20, month: 1, dayOfMonth: 20, familyOT: "Gênesis 21", familyNT: "Mateus 20", personalOT: "Neemias 10", personalNT: "Atos 20", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 21, month: 1, dayOfMonth: 21, familyOT: "Gênesis 22", familyNT: "Mateus 21", personalOT: "Neemias 11", personalNT: "Atos 21", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 22, month: 1, dayOfMonth: 22, familyOT: "Gênesis 23", familyNT: "Mateus 22", personalOT: "Neemias 12", personalNT: "Atos 22", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 23, month: 1, dayOfMonth: 23, familyOT: "Gênesis 24", familyNT: "Mateus 23", personalOT: "Neemias 13", personalNT: "Atos 23", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 24, month: 1, dayOfMonth: 24, familyOT: "Gênesis 25", familyNT: "Mateus 24", personalOT: "Ester 1", personalNT: "Atos 24", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 25, month: 1, dayOfMonth: 25, familyOT: "Gênesis 26", familyNT: "Mateus 25", personalOT: "Ester 2", personalNT: "Atos 25", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 26, month: 1, dayOfMonth: 26, familyOT: "Gênesis 27", familyNT: "Mateus 26", personalOT: "Ester 3", personalNT: "Atos 26", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 27, month: 1, dayOfMonth: 27, familyOT: "Gênesis 28", familyNT: "Mateus 27", personalOT: "Ester 4", personalNT: "Atos 27", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 28, month: 1, dayOfMonth: 28, familyOT: "Gênesis 29", familyNT: "Mateus 28", personalOT: "Ester 5", personalNT: "Atos 28", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 29, month: 1, dayOfMonth: 29, familyOT: "Gênesis 30", familyNT: "Marcos 1", personalOT: "Ester 6", personalNT: "Romanos 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 30, month: 1, dayOfMonth: 30, familyOT: "Gênesis 31", familyNT: "Marcos 2", personalOT: "Ester 7", personalNT: "Romanos 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 31, month: 1, dayOfMonth: 31, familyOT: "Gênesis 32", familyNT: "Marcos 3", personalOT: "Ester 8", personalNT: "Romanos 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // FEVEREIRO
  { day: 32, month: 2, dayOfMonth: 1, familyOT: "Gênesis 33", familyNT: "Marcos 4", personalOT: "Ester 9-10", personalNT: "Romanos 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 33, month: 2, dayOfMonth: 2, familyOT: "Gênesis 34", familyNT: "Marcos 5", personalOT: "Jó 1", personalNT: "Romanos 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 34, month: 2, dayOfMonth: 3, familyOT: "Gênesis 35-36", familyNT: "Marcos 6", personalOT: "Jó 2", personalNT: "Romanos 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 35, month: 2, dayOfMonth: 4, familyOT: "Gênesis 37", familyNT: "Marcos 7", personalOT: "Jó 3", personalNT: "Romanos 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 36, month: 2, dayOfMonth: 5, familyOT: "Gênesis 38", familyNT: "Marcos 8", personalOT: "Jó 4", personalNT: "Romanos 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 37, month: 2, dayOfMonth: 6, familyOT: "Gênesis 39", familyNT: "Marcos 9", personalOT: "Jó 5", personalNT: "Romanos 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 38, month: 2, dayOfMonth: 7, familyOT: "Gênesis 40", familyNT: "Marcos 10", personalOT: "Jó 6", personalNT: "Romanos 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 39, month: 2, dayOfMonth: 8, familyOT: "Gênesis 41", familyNT: "Marcos 11", personalOT: "Jó 7", personalNT: "Romanos 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 40, month: 2, dayOfMonth: 9, familyOT: "Gênesis 42", familyNT: "Marcos 12", personalOT: "Jó 8", personalNT: "Romanos 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 41, month: 2, dayOfMonth: 10, familyOT: "Gênesis 43", familyNT: "Marcos 13", personalOT: "Jó 9", personalNT: "Romanos 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 42, month: 2, dayOfMonth: 11, familyOT: "Gênesis 44", familyNT: "Marcos 14", personalOT: "Jó 10", personalNT: "Romanos 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 43, month: 2, dayOfMonth: 12, familyOT: "Gênesis 45", familyNT: "Marcos 15", personalOT: "Jó 11", personalNT: "Romanos 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 44, month: 2, dayOfMonth: 13, familyOT: "Gênesis 46", familyNT: "Marcos 16", personalOT: "Jó 12", personalNT: "Romanos 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 45, month: 2, dayOfMonth: 14, familyOT: "Gênesis 47", familyNT: "Lucas 1:1-38", personalOT: "Jó 13", personalNT: "1 Coríntios 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 46, month: 2, dayOfMonth: 15, familyOT: "Gênesis 48", familyNT: "Lucas 1:39-80", personalOT: "Jó 14", personalNT: "1 Coríntios 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 47, month: 2, dayOfMonth: 16, familyOT: "Gênesis 49", familyNT: "Lucas 2", personalOT: "Jó 15", personalNT: "1 Coríntios 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 48, month: 2, dayOfMonth: 17, familyOT: "Gênesis 50", familyNT: "Lucas 3", personalOT: "Jó 16-17", personalNT: "1 Coríntios 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 49, month: 2, dayOfMonth: 18, familyOT: "Êxodo 1", familyNT: "Lucas 4", personalOT: "Jó 18", personalNT: "1 Coríntios 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 50, month: 2, dayOfMonth: 19, familyOT: "Êxodo 2", familyNT: "Lucas 5", personalOT: "Jó 19", personalNT: "1 Coríntios 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 51, month: 2, dayOfMonth: 20, familyOT: "Êxodo 3", familyNT: "Lucas 6", personalOT: "Jó 20", personalNT: "1 Coríntios 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 52, month: 2, dayOfMonth: 21, familyOT: "Êxodo 4", familyNT: "Lucas 7", personalOT: "Jó 21", personalNT: "1 Coríntios 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 53, month: 2, dayOfMonth: 22, familyOT: "Êxodo 5", familyNT: "Lucas 8", personalOT: "Jó 22", personalNT: "1 Coríntios 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 54, month: 2, dayOfMonth: 23, familyOT: "Êxodo 6", familyNT: "Lucas 9", personalOT: "Jó 23", personalNT: "1 Coríntios 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 55, month: 2, dayOfMonth: 24, familyOT: "Êxodo 7", familyNT: "Lucas 10", personalOT: "Jó 24", personalNT: "1 Coríntios 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 56, month: 2, dayOfMonth: 25, familyOT: "Êxodo 8", familyNT: "Lucas 11", personalOT: "Jó 25-26", personalNT: "1 Coríntios 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 57, month: 2, dayOfMonth: 26, familyOT: "Êxodo 9", familyNT: "Lucas 12", personalOT: "Jó 27", personalNT: "1 Coríntios 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 58, month: 2, dayOfMonth: 27, familyOT: "Êxodo 10", familyNT: "Lucas 13", personalOT: "Jó 28", personalNT: "1 Coríntios 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 59, month: 2, dayOfMonth: 28, familyOT: "Êxodo 11-12:1-20", familyNT: "Lucas 14", personalOT: "Jó 29", personalNT: "1 Coríntios 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // MARÇO
  { day: 60, month: 3, dayOfMonth: 1, familyOT: "Êxodo 12:21-51", familyNT: "Lucas 15", personalOT: "Jó 30", personalNT: "1 Coríntios 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 61, month: 3, dayOfMonth: 2, familyOT: "Êxodo 13", familyNT: "Lucas 16", personalOT: "Jó 31", personalNT: "2 Coríntios 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 62, month: 3, dayOfMonth: 3, familyOT: "Êxodo 14", familyNT: "Lucas 17", personalOT: "Jó 32", personalNT: "2 Coríntios 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 63, month: 3, dayOfMonth: 4, familyOT: "Êxodo 15", familyNT: "Lucas 18", personalOT: "Jó 33", personalNT: "2 Coríntios 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 64, month: 3, dayOfMonth: 5, familyOT: "Êxodo 16", familyNT: "Lucas 19", personalOT: "Jó 34", personalNT: "2 Coríntios 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 65, month: 3, dayOfMonth: 6, familyOT: "Êxodo 17", familyNT: "Lucas 20", personalOT: "Jó 35", personalNT: "2 Coríntios 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 66, month: 3, dayOfMonth: 7, familyOT: "Êxodo 18", familyNT: "Lucas 21", personalOT: "Jó 36", personalNT: "2 Coríntios 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 67, month: 3, dayOfMonth: 8, familyOT: "Êxodo 19", familyNT: "Lucas 22", personalOT: "Jó 37", personalNT: "2 Coríntios 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 68, month: 3, dayOfMonth: 9, familyOT: "Êxodo 20", familyNT: "Lucas 23", personalOT: "Jó 38", personalNT: "2 Coríntios 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 69, month: 3, dayOfMonth: 10, familyOT: "Êxodo 21", familyNT: "Lucas 24", personalOT: "Jó 39", personalNT: "2 Coríntios 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 70, month: 3, dayOfMonth: 11, familyOT: "Êxodo 22", familyNT: "João 1", personalOT: "Jó 40", personalNT: "2 Coríntios 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 71, month: 3, dayOfMonth: 12, familyOT: "Êxodo 23", familyNT: "João 2", personalOT: "Jó 41", personalNT: "2 Coríntios 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 72, month: 3, dayOfMonth: 13, familyOT: "Êxodo 24", familyNT: "João 3", personalOT: "Jó 42", personalNT: "2 Coríntios 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 73, month: 3, dayOfMonth: 14, familyOT: "Êxodo 25", familyNT: "João 4", personalOT: "Provérbios 1", personalNT: "2 Coríntios 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 74, month: 3, dayOfMonth: 15, familyOT: "Êxodo 26", familyNT: "João 5", personalOT: "Provérbios 2", personalNT: "Gálatas 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 75, month: 3, dayOfMonth: 16, familyOT: "Êxodo 27", familyNT: "João 6", personalOT: "Provérbios 3", personalNT: "Gálatas 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 76, month: 3, dayOfMonth: 17, familyOT: "Êxodo 28", familyNT: "João 7", personalOT: "Provérbios 4", personalNT: "Gálatas 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 77, month: 3, dayOfMonth: 18, familyOT: "Êxodo 29", familyNT: "João 8", personalOT: "Provérbios 5", personalNT: "Gálatas 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 78, month: 3, dayOfMonth: 19, familyOT: "Êxodo 30", familyNT: "João 9", personalOT: "Provérbios 6", personalNT: "Gálatas 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 79, month: 3, dayOfMonth: 20, familyOT: "Êxodo 31", familyNT: "João 10", personalOT: "Provérbios 7", personalNT: "Gálatas 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 80, month: 3, dayOfMonth: 21, familyOT: "Êxodo 32", familyNT: "João 11", personalOT: "Provérbios 8", personalNT: "Efésios 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 81, month: 3, dayOfMonth: 22, familyOT: "Êxodo 33", familyNT: "João 12", personalOT: "Provérbios 9", personalNT: "Efésios 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 82, month: 3, dayOfMonth: 23, familyOT: "Êxodo 34", familyNT: "João 13", personalOT: "Provérbios 10", personalNT: "Efésios 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 83, month: 3, dayOfMonth: 24, familyOT: "Êxodo 35", familyNT: "João 14", personalOT: "Provérbios 11", personalNT: "Efésios 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 84, month: 3, dayOfMonth: 25, familyOT: "Êxodo 36", familyNT: "João 15", personalOT: "Provérbios 12", personalNT: "Efésios 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 85, month: 3, dayOfMonth: 26, familyOT: "Êxodo 37", familyNT: "João 16", personalOT: "Provérbios 13", personalNT: "Efésios 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 86, month: 3, dayOfMonth: 27, familyOT: "Êxodo 38", familyNT: "João 17", personalOT: "Provérbios 14", personalNT: "Filipenses 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 87, month: 3, dayOfMonth: 28, familyOT: "Êxodo 39", familyNT: "João 18", personalOT: "Provérbios 15", personalNT: "Filipenses 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 88, month: 3, dayOfMonth: 29, familyOT: "Êxodo 40", familyNT: "João 19", personalOT: "Provérbios 16", personalNT: "Filipenses 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 89, month: 3, dayOfMonth: 30, familyOT: "Levítico 1", familyNT: "João 20", personalOT: "Provérbios 17", personalNT: "Filipenses 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 90, month: 3, dayOfMonth: 31, familyOT: "Levítico 2-3", familyNT: "João 21", personalOT: "Provérbios 18", personalNT: "Colossenses 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // ABRIL
  { day: 91, month: 4, dayOfMonth: 1, familyOT: "Levítico 4", familyNT: "Salmo 1-2", personalOT: "Provérbios 19", personalNT: "Colossenses 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 92, month: 4, dayOfMonth: 2, familyOT: "Levítico 5", familyNT: "Salmo 3-4", personalOT: "Provérbios 20", personalNT: "Colossenses 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 93, month: 4, dayOfMonth: 3, familyOT: "Levítico 6", familyNT: "Salmo 5-6", personalOT: "Provérbios 21", personalNT: "Colossenses 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 94, month: 4, dayOfMonth: 4, familyOT: "Levítico 7", familyNT: "Salmo 7-8", personalOT: "Provérbios 22", personalNT: "1 Tessalonicenses 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 95, month: 4, dayOfMonth: 5, familyOT: "Levítico 8", familyNT: "Salmo 9", personalOT: "Provérbios 23", personalNT: "1 Tessalonicenses 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 96, month: 4, dayOfMonth: 6, familyOT: "Levítico 9", familyNT: "Salmo 10", personalOT: "Provérbios 24", personalNT: "1 Tessalonicenses 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 97, month: 4, dayOfMonth: 7, familyOT: "Levítico 10", familyNT: "Salmo 11-12", personalOT: "Provérbios 25", personalNT: "1 Tessalonicenses 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 98, month: 4, dayOfMonth: 8, familyOT: "Levítico 11-12", familyNT: "Salmo 13-14", personalOT: "Provérbios 26", personalNT: "1 Tessalonicenses 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 99, month: 4, dayOfMonth: 9, familyOT: "Levítico 13", familyNT: "Salmo 15-16", personalOT: "Provérbios 27", personalNT: "2 Tessalonicenses 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 100, month: 4, dayOfMonth: 10, familyOT: "Levítico 14", familyNT: "Salmo 17", personalOT: "Provérbios 28", personalNT: "2 Tessalonicenses 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 101, month: 4, dayOfMonth: 11, familyOT: "Levítico 15", familyNT: "Salmo 18", personalOT: "Provérbios 29", personalNT: "2 Tessalonicenses 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 102, month: 4, dayOfMonth: 12, familyOT: "Levítico 16", familyNT: "Salmo 19", personalOT: "Provérbios 30", personalNT: "1 Timóteo 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 103, month: 4, dayOfMonth: 13, familyOT: "Levítico 17", familyNT: "Salmo 20-21", personalOT: "Provérbios 31", personalNT: "1 Timóteo 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 104, month: 4, dayOfMonth: 14, familyOT: "Levítico 18", familyNT: "Salmo 22", personalOT: "Eclesiastes 1", personalNT: "1 Timóteo 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 105, month: 4, dayOfMonth: 15, familyOT: "Levítico 19", familyNT: "Salmo 23-24", personalOT: "Eclesiastes 2", personalNT: "1 Timóteo 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 106, month: 4, dayOfMonth: 16, familyOT: "Levítico 20", familyNT: "Salmo 25", personalOT: "Eclesiastes 3", personalNT: "1 Timóteo 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 107, month: 4, dayOfMonth: 17, familyOT: "Levítico 21", familyNT: "Salmo 26-27", personalOT: "Eclesiastes 4", personalNT: "1 Timóteo 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 108, month: 4, dayOfMonth: 18, familyOT: "Levítico 22", familyNT: "Salmo 28-29", personalOT: "Eclesiastes 5", personalNT: "2 Timóteo 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 109, month: 4, dayOfMonth: 19, familyOT: "Levítico 23", familyNT: "Salmo 30", personalOT: "Eclesiastes 6", personalNT: "2 Timóteo 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 110, month: 4, dayOfMonth: 20, familyOT: "Levítico 24", familyNT: "Salmo 31", personalOT: "Eclesiastes 7", personalNT: "2 Timóteo 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 111, month: 4, dayOfMonth: 21, familyOT: "Levítico 25", familyNT: "Salmo 32", personalOT: "Eclesiastes 8", personalNT: "2 Timóteo 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 112, month: 4, dayOfMonth: 22, familyOT: "Levítico 26", familyNT: "Salmo 33", personalOT: "Eclesiastes 9", personalNT: "Tito 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 113, month: 4, dayOfMonth: 23, familyOT: "Levítico 27", familyNT: "Salmo 34", personalOT: "Eclesiastes 10", personalNT: "Tito 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 114, month: 4, dayOfMonth: 24, familyOT: "Números 1", familyNT: "Salmo 35", personalOT: "Eclesiastes 11", personalNT: "Tito 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 115, month: 4, dayOfMonth: 25, familyOT: "Números 2", familyNT: "Salmo 36", personalOT: "Eclesiastes 12", personalNT: "Filemom 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 116, month: 4, dayOfMonth: 26, familyOT: "Números 3", familyNT: "Salmo 37", personalOT: "Cantares 1", personalNT: "Hebreus 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 117, month: 4, dayOfMonth: 27, familyOT: "Números 4", familyNT: "Salmo 38", personalOT: "Cantares 2", personalNT: "Hebreus 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 118, month: 4, dayOfMonth: 28, familyOT: "Números 5", familyNT: "Salmo 39", personalOT: "Cantares 3", personalNT: "Hebreus 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 119, month: 4, dayOfMonth: 29, familyOT: "Números 6", familyNT: "Salmo 40-41", personalOT: "Cantares 4", personalNT: "Hebreus 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 120, month: 4, dayOfMonth: 30, familyOT: "Números 7", familyNT: "Salmo 42-43", personalOT: "Cantares 5", personalNT: "Hebreus 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // MAIO
  { day: 121, month: 5, dayOfMonth: 1, familyOT: "Números 8", familyNT: "Salmo 44", personalOT: "Cantares 6", personalNT: "Hebreus 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 122, month: 5, dayOfMonth: 2, familyOT: "Números 9", familyNT: "Salmo 45", personalOT: "Cantares 7", personalNT: "Hebreus 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 123, month: 5, dayOfMonth: 3, familyOT: "Números 10", familyNT: "Salmo 46-47", personalOT: "Cantares 8", personalNT: "Hebreus 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 124, month: 5, dayOfMonth: 4, familyOT: "Números 11", familyNT: "Salmo 48", personalOT: "Isaías 1", personalNT: "Hebreus 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 125, month: 5, dayOfMonth: 5, familyOT: "Números 12-13", familyNT: "Salmo 49", personalOT: "Isaías 2", personalNT: "Hebreus 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 126, month: 5, dayOfMonth: 6, familyOT: "Números 14", familyNT: "Salmo 50", personalOT: "Isaías 3-4", personalNT: "Hebreus 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 127, month: 5, dayOfMonth: 7, familyOT: "Números 15", familyNT: "Salmo 51", personalOT: "Isaías 5", personalNT: "Hebreus 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 128, month: 5, dayOfMonth: 8, familyOT: "Números 16", familyNT: "Salmo 52-54", personalOT: "Isaías 6", personalNT: "Hebreus 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 129, month: 5, dayOfMonth: 9, familyOT: "Números 17-18", familyNT: "Salmo 55", personalOT: "Isaías 7", personalNT: "Tiago 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 130, month: 5, dayOfMonth: 10, familyOT: "Números 19", familyNT: "Salmo 56-57", personalOT: "Isaías 8-9:1-7", personalNT: "Tiago 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 131, month: 5, dayOfMonth: 11, familyOT: "Números 20", familyNT: "Salmo 58-59", personalOT: "Isaías 9:8-10:4", personalNT: "Tiago 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 132, month: 5, dayOfMonth: 12, familyOT: "Números 21", familyNT: "Salmo 60-61", personalOT: "Isaías 10:5-34", personalNT: "Tiago 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 133, month: 5, dayOfMonth: 13, familyOT: "Números 22", familyNT: "Salmo 62-63", personalOT: "Isaías 11-12", personalNT: "Tiago 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 134, month: 5, dayOfMonth: 14, familyOT: "Números 23", familyNT: "Salmo 64-65", personalOT: "Isaías 13", personalNT: "1 Pedro 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 135, month: 5, dayOfMonth: 15, familyOT: "Números 24", familyNT: "Salmo 66-67", personalOT: "Isaías 14", personalNT: "1 Pedro 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 136, month: 5, dayOfMonth: 16, familyOT: "Números 25", familyNT: "Salmo 68", personalOT: "Isaías 15", personalNT: "1 Pedro 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 137, month: 5, dayOfMonth: 17, familyOT: "Números 26", familyNT: "Salmo 69", personalOT: "Isaías 16", personalNT: "1 Pedro 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 138, month: 5, dayOfMonth: 18, familyOT: "Números 27", familyNT: "Salmo 70-71", personalOT: "Isaías 17-18", personalNT: "1 Pedro 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 139, month: 5, dayOfMonth: 19, familyOT: "Números 28", familyNT: "Salmo 72", personalOT: "Isaías 19-20", personalNT: "2 Pedro 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 140, month: 5, dayOfMonth: 20, familyOT: "Números 29", familyNT: "Salmo 73", personalOT: "Isaías 21", personalNT: "2 Pedro 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 141, month: 5, dayOfMonth: 21, familyOT: "Números 30", familyNT: "Salmo 74", personalOT: "Isaías 22", personalNT: "2 Pedro 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 142, month: 5, dayOfMonth: 22, familyOT: "Números 31", familyNT: "Salmo 75-76", personalOT: "Isaías 23", personalNT: "1 João 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 143, month: 5, dayOfMonth: 23, familyOT: "Números 32", familyNT: "Salmo 77", personalOT: "Isaías 24", personalNT: "1 João 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 144, month: 5, dayOfMonth: 24, familyOT: "Números 33", familyNT: "Salmo 78:1-37", personalOT: "Isaías 25", personalNT: "1 João 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 145, month: 5, dayOfMonth: 25, familyOT: "Números 34", familyNT: "Salmo 78:38-72", personalOT: "Isaías 26", personalNT: "1 João 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 146, month: 5, dayOfMonth: 26, familyOT: "Números 35", familyNT: "Salmo 79", personalOT: "Isaías 27", personalNT: "1 João 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 147, month: 5, dayOfMonth: 27, familyOT: "Números 36", familyNT: "Salmo 80", personalOT: "Isaías 28", personalNT: "2 João 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 148, month: 5, dayOfMonth: 28, familyOT: "Deuteronômio 1", familyNT: "Salmo 81-82", personalOT: "Isaías 29", personalNT: "3 João 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 149, month: 5, dayOfMonth: 29, familyOT: "Deuteronômio 2", familyNT: "Salmo 83-84", personalOT: "Isaías 30", personalNT: "Judas 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 150, month: 5, dayOfMonth: 30, familyOT: "Deuteronômio 3", familyNT: "Salmo 85", personalOT: "Isaías 31", personalNT: "Apocalipse 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 151, month: 5, dayOfMonth: 31, familyOT: "Deuteronômio 4", familyNT: "Salmo 86-87", personalOT: "Isaías 32", personalNT: "Apocalipse 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // JUNHO
  { day: 152, month: 6, dayOfMonth: 1, familyOT: "Deuteronômio 5", familyNT: "Salmo 88", personalOT: "Isaías 33", personalNT: "Apocalipse 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 153, month: 6, dayOfMonth: 2, familyOT: "Deuteronômio 6", familyNT: "Salmo 89", personalOT: "Isaías 34", personalNT: "Apocalipse 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 154, month: 6, dayOfMonth: 3, familyOT: "Deuteronômio 7", familyNT: "Salmo 90", personalOT: "Isaías 35", personalNT: "Apocalipse 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 155, month: 6, dayOfMonth: 4, familyOT: "Deuteronômio 8", familyNT: "Salmo 91", personalOT: "Isaías 36", personalNT: "Apocalipse 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 156, month: 6, dayOfMonth: 5, familyOT: "Deuteronômio 9", familyNT: "Salmo 92-93", personalOT: "Isaías 37", personalNT: "Apocalipse 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 157, month: 6, dayOfMonth: 6, familyOT: "Deuteronômio 10", familyNT: "Salmo 94", personalOT: "Isaías 38", personalNT: "Apocalipse 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 158, month: 6, dayOfMonth: 7, familyOT: "Deuteronômio 11", familyNT: "Salmo 95-96", personalOT: "Isaías 39", personalNT: "Apocalipse 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 159, month: 6, dayOfMonth: 8, familyOT: "Deuteronômio 12", familyNT: "Salmo 97-98", personalOT: "Isaías 40", personalNT: "Apocalipse 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 160, month: 6, dayOfMonth: 9, familyOT: "Deuteronômio 13-14", familyNT: "Salmo 99-101", personalOT: "Isaías 41", personalNT: "Apocalipse 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 161, month: 6, dayOfMonth: 10, familyOT: "Deuteronômio 15", familyNT: "Salmo 102", personalOT: "Isaías 42", personalNT: "Apocalipse 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 162, month: 6, dayOfMonth: 11, familyOT: "Deuteronômio 16", familyNT: "Salmo 103", personalOT: "Isaías 43", personalNT: "Apocalipse 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 163, month: 6, dayOfMonth: 12, familyOT: "Deuteronômio 17", familyNT: "Salmo 104", personalOT: "Isaías 44", personalNT: "Apocalipse 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 164, month: 6, dayOfMonth: 13, familyOT: "Deuteronômio 18", familyNT: "Salmo 105", personalOT: "Isaías 45", personalNT: "Apocalipse 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 165, month: 6, dayOfMonth: 14, familyOT: "Deuteronômio 19", familyNT: "Salmo 106", personalOT: "Isaías 46", personalNT: "Apocalipse 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 166, month: 6, dayOfMonth: 15, familyOT: "Deuteronômio 20", familyNT: "Salmo 107", personalOT: "Isaías 47", personalNT: "Apocalipse 17", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 167, month: 6, dayOfMonth: 16, familyOT: "Deuteronômio 21", familyNT: "Salmo 108-109", personalOT: "Isaías 48", personalNT: "Apocalipse 18", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 168, month: 6, dayOfMonth: 17, familyOT: "Deuteronômio 22", familyNT: "Salmo 110-111", personalOT: "Isaías 49", personalNT: "Apocalipse 19", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 169, month: 6, dayOfMonth: 18, familyOT: "Deuteronômio 23", familyNT: "Salmo 112-113", personalOT: "Isaías 50", personalNT: "Apocalipse 20", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 170, month: 6, dayOfMonth: 19, familyOT: "Deuteronômio 24", familyNT: "Salmo 114-115", personalOT: "Isaías 51", personalNT: "Apocalipse 21", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 171, month: 6, dayOfMonth: 20, familyOT: "Deuteronômio 25", familyNT: "Salmo 116", personalOT: "Isaías 52", personalNT: "Apocalipse 22", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 172, month: 6, dayOfMonth: 21, familyOT: "Deuteronômio 26", familyNT: "Salmo 117-118", personalOT: "Isaías 53", personalNT: "Mateus 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 173, month: 6, dayOfMonth: 22, familyOT: "Deuteronômio 27-28:1-19", familyNT: "Salmo 119:1-24", personalOT: "Isaías 54", personalNT: "Mateus 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 174, month: 6, dayOfMonth: 23, familyOT: "Deuteronômio 28:20-68", familyNT: "Salmo 119:25-48", personalOT: "Isaías 55", personalNT: "Mateus 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 175, month: 6, dayOfMonth: 24, familyOT: "Deuteronômio 29", familyNT: "Salmo 119:49-72", personalOT: "Isaías 56", personalNT: "Mateus 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 176, month: 6, dayOfMonth: 25, familyOT: "Deuteronômio 30", familyNT: "Salmo 119:73-96", personalOT: "Isaías 57", personalNT: "Mateus 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 177, month: 6, dayOfMonth: 26, familyOT: "Deuteronômio 31", familyNT: "Salmo 119:97-120", personalOT: "Isaías 58", personalNT: "Mateus 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 178, month: 6, dayOfMonth: 27, familyOT: "Deuteronômio 32", familyNT: "Salmo 119:121-144", personalOT: "Isaías 59", personalNT: "Mateus 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 179, month: 6, dayOfMonth: 28, familyOT: "Deuteronômio 33-34", familyNT: "Salmo 119:145-176", personalOT: "Isaías 60", personalNT: "Mateus 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 180, month: 6, dayOfMonth: 29, familyOT: "Josué 1", familyNT: "Salmo 120-122", personalOT: "Isaías 61", personalNT: "Mateus 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 181, month: 6, dayOfMonth: 30, familyOT: "Josué 2", familyNT: "Salmo 123-125", personalOT: "Isaías 62", personalNT: "Mateus 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // JULHO
  { day: 182, month: 7, dayOfMonth: 1, familyOT: "Josué 3", familyNT: "Salmo 126-128", personalOT: "Isaías 63", personalNT: "Mateus 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 183, month: 7, dayOfMonth: 2, familyOT: "Josué 4", familyNT: "Salmo 129-131", personalOT: "Isaías 64", personalNT: "Mateus 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 184, month: 7, dayOfMonth: 3, familyOT: "Josué 5-6:1-5", familyNT: "Salmo 132-134", personalOT: "Isaías 65", personalNT: "Mateus 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 185, month: 7, dayOfMonth: 4, familyOT: "Josué 6:6-27", familyNT: "Salmo 135-136", personalOT: "Isaías 66", personalNT: "Mateus 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 186, month: 7, dayOfMonth: 5, familyOT: "Josué 7", familyNT: "Salmo 137-138", personalOT: "Jeremias 1", personalNT: "Mateus 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 187, month: 7, dayOfMonth: 6, familyOT: "Josué 8", familyNT: "Salmo 139", personalOT: "Jeremias 2", personalNT: "Mateus 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 188, month: 7, dayOfMonth: 7, familyOT: "Josué 9", familyNT: "Salmo 140-141", personalOT: "Jeremias 3", personalNT: "Mateus 17", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 189, month: 7, dayOfMonth: 8, familyOT: "Josué 10", familyNT: "Salmo 142-143", personalOT: "Jeremias 4", personalNT: "Mateus 18", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 190, month: 7, dayOfMonth: 9, familyOT: "Josué 11", familyNT: "Salmo 144", personalOT: "Jeremias 5", personalNT: "Mateus 19", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 191, month: 7, dayOfMonth: 10, familyOT: "Josué 12-13", familyNT: "Salmo 145", personalOT: "Jeremias 6", personalNT: "Mateus 20", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 192, month: 7, dayOfMonth: 11, familyOT: "Josué 14-15", familyNT: "Salmo 146-147", personalOT: "Jeremias 7", personalNT: "Mateus 21", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 193, month: 7, dayOfMonth: 12, familyOT: "Josué 16-17", familyNT: "Salmo 148", personalOT: "Jeremias 8", personalNT: "Mateus 22", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 194, month: 7, dayOfMonth: 13, familyOT: "Josué 18-19", familyNT: "Salmo 149-150", personalOT: "Jeremias 9", personalNT: "Mateus 23", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 195, month: 7, dayOfMonth: 14, familyOT: "Josué 20-21", familyNT: "Atos 1", personalOT: "Jeremias 10", personalNT: "Mateus 24", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 196, month: 7, dayOfMonth: 15, familyOT: "Josué 22", familyNT: "Atos 2", personalOT: "Jeremias 11", personalNT: "Mateus 25", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 197, month: 7, dayOfMonth: 16, familyOT: "Josué 23", familyNT: "Atos 3", personalOT: "Jeremias 12", personalNT: "Mateus 26", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 198, month: 7, dayOfMonth: 17, familyOT: "Josué 24", familyNT: "Atos 4", personalOT: "Jeremias 13", personalNT: "Mateus 27", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 199, month: 7, dayOfMonth: 18, familyOT: "Juízes 1", familyNT: "Atos 5", personalOT: "Jeremias 14", personalNT: "Mateus 28", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 200, month: 7, dayOfMonth: 19, familyOT: "Juízes 2", familyNT: "Atos 6", personalOT: "Jeremias 15", personalNT: "Marcos 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 201, month: 7, dayOfMonth: 20, familyOT: "Juízes 3", familyNT: "Atos 7", personalOT: "Jeremias 16", personalNT: "Marcos 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 202, month: 7, dayOfMonth: 21, familyOT: "Juízes 4", familyNT: "Atos 8", personalOT: "Jeremias 17", personalNT: "Marcos 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 203, month: 7, dayOfMonth: 22, familyOT: "Juízes 5", familyNT: "Atos 9", personalOT: "Jeremias 18", personalNT: "Marcos 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 204, month: 7, dayOfMonth: 23, familyOT: "Juízes 6", familyNT: "Atos 10", personalOT: "Jeremias 19", personalNT: "Marcos 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 205, month: 7, dayOfMonth: 24, familyOT: "Juízes 7", familyNT: "Atos 11", personalOT: "Jeremias 20", personalNT: "Marcos 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 206, month: 7, dayOfMonth: 25, familyOT: "Juízes 8", familyNT: "Atos 12", personalOT: "Jeremias 21", personalNT: "Marcos 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 207, month: 7, dayOfMonth: 26, familyOT: "Juízes 9", familyNT: "Atos 13", personalOT: "Jeremias 22", personalNT: "Marcos 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 208, month: 7, dayOfMonth: 27, familyOT: "Juízes 10-11:1-11", familyNT: "Atos 14", personalOT: "Jeremias 23", personalNT: "Marcos 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 209, month: 7, dayOfMonth: 28, familyOT: "Juízes 11:12-40", familyNT: "Atos 15", personalOT: "Jeremias 24", personalNT: "Marcos 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 210, month: 7, dayOfMonth: 29, familyOT: "Juízes 12", familyNT: "Atos 16", personalOT: "Jeremias 25", personalNT: "Marcos 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 211, month: 7, dayOfMonth: 30, familyOT: "Juízes 13", familyNT: "Atos 17", personalOT: "Jeremias 26", personalNT: "Marcos 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 212, month: 7, dayOfMonth: 31, familyOT: "Juízes 14", familyNT: "Atos 18", personalOT: "Jeremias 27", personalNT: "Marcos 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // AGOSTO
  { day: 213, month: 8, dayOfMonth: 1, familyOT: "Juízes 15", familyNT: "Atos 19", personalOT: "Jeremias 28", personalNT: "Marcos 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 214, month: 8, dayOfMonth: 2, familyOT: "Juízes 16", familyNT: "Atos 20", personalOT: "Jeremias 29", personalNT: "Marcos 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 215, month: 8, dayOfMonth: 3, familyOT: "Juízes 17", familyNT: "Atos 21", personalOT: "Jeremias 30-31", personalNT: "Marcos 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 216, month: 8, dayOfMonth: 4, familyOT: "Juízes 18", familyNT: "Atos 22", personalOT: "Jeremias 32", personalNT: "Salmo 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 217, month: 8, dayOfMonth: 5, familyOT: "Juízes 19", familyNT: "Atos 23", personalOT: "Jeremias 33", personalNT: "Salmo 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 218, month: 8, dayOfMonth: 6, familyOT: "Juízes 20", familyNT: "Atos 24", personalOT: "Jeremias 34", personalNT: "Salmo 3-4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 219, month: 8, dayOfMonth: 7, familyOT: "Juízes 21", familyNT: "Atos 25", personalOT: "Jeremias 35", personalNT: "Salmo 5-6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 220, month: 8, dayOfMonth: 8, familyOT: "Rute 1", familyNT: "Atos 26", personalOT: "Jeremias 36", personalNT: "Salmo 7-8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 221, month: 8, dayOfMonth: 9, familyOT: "Rute 2", familyNT: "Atos 27", personalOT: "Jeremias 37", personalNT: "Salmo 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 222, month: 8, dayOfMonth: 10, familyOT: "Rute 3-4", familyNT: "Atos 28", personalOT: "Jeremias 38", personalNT: "Salmo 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 223, month: 8, dayOfMonth: 11, familyOT: "1 Samuel 1", familyNT: "Romanos 1", personalOT: "Jeremias 39", personalNT: "Salmo 11-12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 224, month: 8, dayOfMonth: 12, familyOT: "1 Samuel 2", familyNT: "Romanos 2", personalOT: "Jeremias 40", personalNT: "Salmo 13-14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 225, month: 8, dayOfMonth: 13, familyOT: "1 Samuel 3", familyNT: "Romanos 3", personalOT: "Jeremias 41", personalNT: "Salmo 15-16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 226, month: 8, dayOfMonth: 14, familyOT: "1 Samuel 4", familyNT: "Romanos 4", personalOT: "Jeremias 42", personalNT: "Salmo 17", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 227, month: 8, dayOfMonth: 15, familyOT: "1 Samuel 5-6", familyNT: "Romanos 5", personalOT: "Jeremias 43", personalNT: "Salmo 18", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 228, month: 8, dayOfMonth: 16, familyOT: "1 Samuel 7-8", familyNT: "Romanos 6", personalOT: "Jeremias 44", personalNT: "Salmo 19", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 229, month: 8, dayOfMonth: 17, familyOT: "1 Samuel 9", familyNT: "Romanos 7", personalOT: "Jeremias 45", personalNT: "Salmo 20-21", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 230, month: 8, dayOfMonth: 18, familyOT: "1 Samuel 10", familyNT: "Romanos 8", personalOT: "Jeremias 46", personalNT: "Salmo 22", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 231, month: 8, dayOfMonth: 19, familyOT: "1 Samuel 11", familyNT: "Romanos 9", personalOT: "Jeremias 47", personalNT: "Salmo 23-24", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 232, month: 8, dayOfMonth: 20, familyOT: "1 Samuel 12", familyNT: "Romanos 10", personalOT: "Jeremias 48", personalNT: "Salmo 25", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 233, month: 8, dayOfMonth: 21, familyOT: "1 Samuel 13", familyNT: "Romanos 11", personalOT: "Jeremias 49", personalNT: "Salmo 26-27", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 234, month: 8, dayOfMonth: 22, familyOT: "1 Samuel 14", familyNT: "Romanos 12", personalOT: "Jeremias 50", personalNT: "Salmo 28-29", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 235, month: 8, dayOfMonth: 23, familyOT: "1 Samuel 15", familyNT: "Romanos 13", personalOT: "Jeremias 51", personalNT: "Salmo 30", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 236, month: 8, dayOfMonth: 24, familyOT: "1 Samuel 16", familyNT: "Romanos 14", personalOT: "Jeremias 52", personalNT: "Salmo 31", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 237, month: 8, dayOfMonth: 25, familyOT: "1 Samuel 17", familyNT: "Romanos 15", personalOT: "Lamentações 1", personalNT: "Salmo 32", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 238, month: 8, dayOfMonth: 26, familyOT: "1 Samuel 18", familyNT: "Romanos 16", personalOT: "Lamentações 2", personalNT: "Salmo 33", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 239, month: 8, dayOfMonth: 27, familyOT: "1 Samuel 19", familyNT: "1 Coríntios 1", personalOT: "Lamentações 3", personalNT: "Salmo 34", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 240, month: 8, dayOfMonth: 28, familyOT: "1 Samuel 20", familyNT: "1 Coríntios 2", personalOT: "Lamentações 4", personalNT: "Salmo 35", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 241, month: 8, dayOfMonth: 29, familyOT: "1 Samuel 21-22", familyNT: "1 Coríntios 3", personalOT: "Lamentações 5", personalNT: "Salmo 36", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 242, month: 8, dayOfMonth: 30, familyOT: "1 Samuel 23", familyNT: "1 Coríntios 4", personalOT: "Ezequiel 1", personalNT: "Salmo 37", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 243, month: 8, dayOfMonth: 31, familyOT: "1 Samuel 24", familyNT: "1 Coríntios 5", personalOT: "Ezequiel 2", personalNT: "Salmo 38", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // SETEMBRO
  { day: 244, month: 9, dayOfMonth: 1, familyOT: "1 Samuel 25", familyNT: "1 Coríntios 6", personalOT: "Ezequiel 3", personalNT: "Salmo 39", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 245, month: 9, dayOfMonth: 2, familyOT: "1 Samuel 26", familyNT: "1 Coríntios 7", personalOT: "Ezequiel 4", personalNT: "Salmo 40-41", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 246, month: 9, dayOfMonth: 3, familyOT: "1 Samuel 27", familyNT: "1 Coríntios 8", personalOT: "Ezequiel 5", personalNT: "Salmo 42-43", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 247, month: 9, dayOfMonth: 4, familyOT: "1 Samuel 28", familyNT: "1 Coríntios 9", personalOT: "Ezequiel 6", personalNT: "Salmo 44", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 248, month: 9, dayOfMonth: 5, familyOT: "1 Samuel 29-30", familyNT: "1 Coríntios 10", personalOT: "Ezequiel 7", personalNT: "Salmo 45", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 249, month: 9, dayOfMonth: 6, familyOT: "1 Samuel 31", familyNT: "1 Coríntios 11", personalOT: "Ezequiel 8", personalNT: "Salmo 46-47", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 250, month: 9, dayOfMonth: 7, familyOT: "2 Samuel 1", familyNT: "1 Coríntios 12", personalOT: "Ezequiel 9", personalNT: "Salmo 48", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 251, month: 9, dayOfMonth: 8, familyOT: "2 Samuel 2", familyNT: "1 Coríntios 13", personalOT: "Ezequiel 10", personalNT: "Salmo 49", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 252, month: 9, dayOfMonth: 9, familyOT: "2 Samuel 3", familyNT: "1 Coríntios 14", personalOT: "Ezequiel 11", personalNT: "Salmo 50", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 253, month: 9, dayOfMonth: 10, familyOT: "2 Samuel 4-5", familyNT: "1 Coríntios 15", personalOT: "Ezequiel 12", personalNT: "Salmo 51", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 254, month: 9, dayOfMonth: 11, familyOT: "2 Samuel 6", familyNT: "1 Coríntios 16", personalOT: "Ezequiel 13", personalNT: "Salmo 52-54", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 255, month: 9, dayOfMonth: 12, familyOT: "2 Samuel 7", familyNT: "2 Coríntios 1", personalOT: "Ezequiel 14", personalNT: "Salmo 55", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 256, month: 9, dayOfMonth: 13, familyOT: "2 Samuel 8-9", familyNT: "2 Coríntios 2", personalOT: "Ezequiel 15", personalNT: "Salmo 56-57", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 257, month: 9, dayOfMonth: 14, familyOT: "2 Samuel 10", familyNT: "2 Coríntios 3", personalOT: "Ezequiel 16", personalNT: "Salmo 58-59", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 258, month: 9, dayOfMonth: 15, familyOT: "2 Samuel 11", familyNT: "2 Coríntios 4", personalOT: "Ezequiel 17", personalNT: "Salmo 60-61", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 259, month: 9, dayOfMonth: 16, familyOT: "2 Samuel 12", familyNT: "2 Coríntios 5", personalOT: "Ezequiel 18", personalNT: "Salmo 62-63", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 260, month: 9, dayOfMonth: 17, familyOT: "2 Samuel 13", familyNT: "2 Coríntios 6", personalOT: "Ezequiel 19", personalNT: "Salmo 64-65", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 261, month: 9, dayOfMonth: 18, familyOT: "2 Samuel 14", familyNT: "2 Coríntios 7", personalOT: "Ezequiel 20", personalNT: "Salmo 66-67", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 262, month: 9, dayOfMonth: 19, familyOT: "2 Samuel 15", familyNT: "2 Coríntios 8", personalOT: "Ezequiel 21", personalNT: "Salmo 68", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 263, month: 9, dayOfMonth: 20, familyOT: "2 Samuel 16", familyNT: "2 Coríntios 9", personalOT: "Ezequiel 22", personalNT: "Salmo 69", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 264, month: 9, dayOfMonth: 21, familyOT: "2 Samuel 17", familyNT: "2 Coríntios 10", personalOT: "Ezequiel 23", personalNT: "Salmo 70-71", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 265, month: 9, dayOfMonth: 22, familyOT: "2 Samuel 18", familyNT: "2 Coríntios 11", personalOT: "Ezequiel 24", personalNT: "Salmo 72", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 266, month: 9, dayOfMonth: 23, familyOT: "2 Samuel 19", familyNT: "2 Coríntios 12", personalOT: "Ezequiel 25", personalNT: "Salmo 73", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 267, month: 9, dayOfMonth: 24, familyOT: "2 Samuel 20", familyNT: "2 Coríntios 13", personalOT: "Ezequiel 26", personalNT: "Salmo 74", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 268, month: 9, dayOfMonth: 25, familyOT: "2 Samuel 21", familyNT: "Gálatas 1", personalOT: "Ezequiel 27", personalNT: "Salmo 75-76", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 269, month: 9, dayOfMonth: 26, familyOT: "2 Samuel 22", familyNT: "Gálatas 2", personalOT: "Ezequiel 28", personalNT: "Salmo 77", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 270, month: 9, dayOfMonth: 27, familyOT: "2 Samuel 23", familyNT: "Gálatas 3", personalOT: "Ezequiel 29", personalNT: "Salmo 78:1-37", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 271, month: 9, dayOfMonth: 28, familyOT: "2 Samuel 24", familyNT: "Gálatas 4", personalOT: "Ezequiel 30", personalNT: "Salmo 78:38-72", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 272, month: 9, dayOfMonth: 29, familyOT: "1 Reis 1", familyNT: "Gálatas 5", personalOT: "Ezequiel 31", personalNT: "Salmo 79", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 273, month: 9, dayOfMonth: 30, familyOT: "1 Reis 2", familyNT: "Gálatas 6", personalOT: "Ezequiel 32", personalNT: "Salmo 80", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // OUTUBRO
  { day: 274, month: 10, dayOfMonth: 1, familyOT: "1 Reis 3", familyNT: "Efésios 1", personalOT: "Ezequiel 33", personalNT: "Salmo 81-82", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 275, month: 10, dayOfMonth: 2, familyOT: "1 Reis 4-5", familyNT: "Efésios 2", personalOT: "Ezequiel 34", personalNT: "Salmo 83-84", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 276, month: 10, dayOfMonth: 3, familyOT: "1 Reis 6", familyNT: "Efésios 3", personalOT: "Ezequiel 35", personalNT: "Salmo 85", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 277, month: 10, dayOfMonth: 4, familyOT: "1 Reis 7", familyNT: "Efésios 4", personalOT: "Ezequiel 36", personalNT: "Salmo 86", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 278, month: 10, dayOfMonth: 5, familyOT: "1 Reis 8", familyNT: "Efésios 5", personalOT: "Ezequiel 37", personalNT: "Salmo 87-88", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 279, month: 10, dayOfMonth: 6, familyOT: "1 Reis 9", familyNT: "Efésios 6", personalOT: "Ezequiel 38", personalNT: "Salmo 89", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 280, month: 10, dayOfMonth: 7, familyOT: "1 Reis 10", familyNT: "Filipenses 1", personalOT: "Ezequiel 40", personalNT: "Salmo 91", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 281, month: 10, dayOfMonth: 8, familyOT: "1 Reis 11", familyNT: "Filipenses 2", personalOT: "Ezequiel 40", personalNT: "Salmo 91", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 282, month: 10, dayOfMonth: 9, familyOT: "1 Reis 12", familyNT: "Filipenses 3", personalOT: "Ezequiel 41", personalNT: "Salmo 92-93", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 283, month: 10, dayOfMonth: 10, familyOT: "1 Reis 13", familyNT: "Filipenses 4", personalOT: "Ezequiel 42", personalNT: "Salmo 94", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 284, month: 10, dayOfMonth: 11, familyOT: "1 Reis 14", familyNT: "Colossenses 1", personalOT: "Ezequiel 43", personalNT: "Salmo 95-96", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 285, month: 10, dayOfMonth: 12, familyOT: "1 Reis 15", familyNT: "Colossenses 2", personalOT: "Ezequiel 44", personalNT: "Salmo 97-98", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 286, month: 10, dayOfMonth: 13, familyOT: "1 Reis 16", familyNT: "Colossenses 3", personalOT: "Ezequiel 45", personalNT: "Salmo 99-101", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 287, month: 10, dayOfMonth: 14, familyOT: "1 Reis 17", familyNT: "Colossenses 4", personalOT: "Ezequiel 46", personalNT: "Salmo 102", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 288, month: 10, dayOfMonth: 15, familyOT: "1 Reis 18", familyNT: "1 Tessalonicenses 1", personalOT: "Ezequiel 47", personalNT: "Salmo 103", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 289, month: 10, dayOfMonth: 16, familyOT: "1 Reis 19", familyNT: "1 Tessalonicenses 2", personalOT: "Ezequiel 48", personalNT: "Salmo 104", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 290, month: 10, dayOfMonth: 17, familyOT: "1 Reis 20", familyNT: "1 Tessalonicenses 3", personalOT: "Daniel 1", personalNT: "Salmo 105", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 291, month: 10, dayOfMonth: 18, familyOT: "1 Reis 21", familyNT: "1 Tessalonicenses 4", personalOT: "Daniel 2", personalNT: "Salmo 106", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 292, month: 10, dayOfMonth: 19, familyOT: "1 Reis 22", familyNT: "1 Tessalonicenses 5", personalOT: "Daniel 3", personalNT: "Salmo 107", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 293, month: 10, dayOfMonth: 20, familyOT: "2 Reis 1", familyNT: "2 Tessalonicenses 1", personalOT: "Daniel 4", personalNT: "Salmo 108-109", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 294, month: 10, dayOfMonth: 21, familyOT: "2 Reis 2", familyNT: "2 Tessalonicenses 2", personalOT: "Daniel 5", personalNT: "Salmo 110-111", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 295, month: 10, dayOfMonth: 22, familyOT: "2 Reis 3", familyNT: "2 Tessalonicenses 3", personalOT: "Daniel 6", personalNT: "Salmo 112-113", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 296, month: 10, dayOfMonth: 23, familyOT: "2 Reis 4", familyNT: "1 Timóteo 1", personalOT: "Daniel 7", personalNT: "Salmo 114-115", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 297, month: 10, dayOfMonth: 24, familyOT: "2 Reis 5", familyNT: "1 Timóteo 2", personalOT: "Daniel 8", personalNT: "Salmo 116", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 298, month: 10, dayOfMonth: 25, familyOT: "2 Reis 6", familyNT: "1 Timóteo 3", personalOT: "Daniel 9", personalNT: "Salmo 117-118", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 299, month: 10, dayOfMonth: 26, familyOT: "2 Reis 7", familyNT: "1 Timóteo 4", personalOT: "Daniel 10", personalNT: "Salmo 119:1-24", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 300, month: 10, dayOfMonth: 27, familyOT: "2 Reis 8", familyNT: "1 Timóteo 5", personalOT: "Daniel 11", personalNT: "Salmo 119:25-48", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 301, month: 10, dayOfMonth: 28, familyOT: "2 Reis 9", familyNT: "1 Timóteo 6", personalOT: "Daniel 12", personalNT: "Salmo 119:49-72", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 302, month: 10, dayOfMonth: 29, familyOT: "2 Reis 10-11", familyNT: "2 Timóteo 1", personalOT: "Oséias 1", personalNT: "Salmo 119:73-96", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 303, month: 10, dayOfMonth: 30, familyOT: "2 Reis 12", familyNT: "2 Timóteo 2", personalOT: "Oséias 2", personalNT: "Salmo 119:97-120", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 304, month: 10, dayOfMonth: 31, familyOT: "2 Reis 13", familyNT: "2 Timóteo 3", personalOT: "Oséias 3-4", personalNT: "Salmo 119:121-144", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // NOVEMBRO
  { day: 305, month: 11, dayOfMonth: 1, familyOT: "2 Reis 14", familyNT: "2 Timóteo 4", personalOT: "Oséias 5-6", personalNT: "Salmo 119:145-176", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 306, month: 11, dayOfMonth: 2, familyOT: "2 Reis 15", familyNT: "Tito 1", personalOT: "Oséias 7", personalNT: "Salmo 120-122", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 307, month: 11, dayOfMonth: 3, familyOT: "2 Reis 16", familyNT: "Tito 2", personalOT: "Oséias 8", personalNT: "Salmo 123-125", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 308, month: 11, dayOfMonth: 4, familyOT: "2 Reis 17", familyNT: "Tito 3", personalOT: "Oséias 9", personalNT: "Salmo 126-128", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 309, month: 11, dayOfMonth: 5, familyOT: "2 Reis 18", familyNT: "Filemom 1", personalOT: "Oséias 10", personalNT: "Salmo 129-131", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 310, month: 11, dayOfMonth: 6, familyOT: "2 Reis 19", familyNT: "Hebreus 1", personalOT: "Oséias 11", personalNT: "Salmo 132-134", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 311, month: 11, dayOfMonth: 7, familyOT: "2 Reis 20", familyNT: "Hebreus 2", personalOT: "Oséias 12", personalNT: "Salmo 135-136", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 312, month: 11, dayOfMonth: 8, familyOT: "2 Reis 21", familyNT: "Hebreus 3", personalOT: "Oséias 13", personalNT: "Salmo 137-138", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 313, month: 11, dayOfMonth: 9, familyOT: "2 Reis 22", familyNT: "Hebreus 4", personalOT: "Oséias 14", personalNT: "Salmo 139", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 314, month: 11, dayOfMonth: 10, familyOT: "2 Reis 23", familyNT: "Hebreus 5", personalOT: "Joel 1", personalNT: "Salmo 140-141", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 315, month: 11, dayOfMonth: 11, familyOT: "2 Reis 24", familyNT: "Hebreus 6", personalOT: "Joel 2", personalNT: "Salmo 142", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 316, month: 11, dayOfMonth: 12, familyOT: "2 Reis 25", familyNT: "Hebreus 7", personalOT: "Joel 3", personalNT: "Salmo 143", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 317, month: 11, dayOfMonth: 13, familyOT: "1 Crônicas 1-2", familyNT: "Hebreus 8", personalOT: "Amós 1", personalNT: "Salmo 144", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 318, month: 11, dayOfMonth: 14, familyOT: "1 Crônicas 3-4", familyNT: "Hebreus 9", personalOT: "Amós 2", personalNT: "Salmo 145", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 319, month: 11, dayOfMonth: 15, familyOT: "1 Crônicas 5-6", familyNT: "Hebreus 10", personalOT: "Amós 3", personalNT: "Salmo 146-147", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 320, month: 11, dayOfMonth: 16, familyOT: "1 Crônicas 7-8", familyNT: "Hebreus 11", personalOT: "Amós 4", personalNT: "Salmo 148-150", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 321, month: 11, dayOfMonth: 17, familyOT: "1 Crônicas 9-10", familyNT: "Hebreus 12", personalOT: "Amós 5", personalNT: "Lucas 1:1-38", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 322, month: 11, dayOfMonth: 18, familyOT: "1 Crônicas 11-12", familyNT: "Hebreus 13", personalOT: "Amós 6", personalNT: "Lucas 1:39-80", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 323, month: 11, dayOfMonth: 19, familyOT: "1 Crônicas 13-14", familyNT: "Tiago 1", personalOT: "Amós 7", personalNT: "Lucas 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 324, month: 11, dayOfMonth: 20, familyOT: "1 Crônicas 15", familyNT: "Tiago 2", personalOT: "Amós 8", personalNT: "Lucas 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 325, month: 11, dayOfMonth: 21, familyOT: "1 Crônicas 16", familyNT: "Tiago 3", personalOT: "Amós 9", personalNT: "Lucas 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 326, month: 11, dayOfMonth: 22, familyOT: "1 Crônicas 17", familyNT: "Tiago 4", personalOT: "Obadias 1", personalNT: "Lucas 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 327, month: 11, dayOfMonth: 23, familyOT: "1 Crônicas 18", familyNT: "Tiago 5", personalOT: "Jonas 1", personalNT: "Lucas 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 328, month: 11, dayOfMonth: 24, familyOT: "1 Crônicas 19-20", familyNT: "1 Pedro 1", personalOT: "Jonas 2", personalNT: "Lucas 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 329, month: 11, dayOfMonth: 25, familyOT: "1 Crônicas 21", familyNT: "1 Pedro 2", personalOT: "Jonas 3", personalNT: "Lucas 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 330, month: 11, dayOfMonth: 26, familyOT: "1 Crônicas 22", familyNT: "1 Pedro 3", personalOT: "Jonas 4", personalNT: "Lucas 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 331, month: 11, dayOfMonth: 27, familyOT: "1 Crônicas 23", familyNT: "1 Pedro 4", personalOT: "Miquéias 1", personalNT: "Lucas 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 332, month: 11, dayOfMonth: 28, familyOT: "1 Crônicas 24-25", familyNT: "1 Pedro 5", personalOT: "Miquéias 2", personalNT: "Lucas 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 333, month: 11, dayOfMonth: 29, familyOT: "1 Crônicas 26-27", familyNT: "2 Pedro 1", personalOT: "Miquéias 3", personalNT: "Lucas 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 334, month: 11, dayOfMonth: 30, familyOT: "1 Crônicas 28", familyNT: "2 Pedro 2", personalOT: "Miquéias 4", personalNT: "Lucas 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },

  // DEZEMBRO
  { day: 335, month: 12, dayOfMonth: 1, familyOT: "1 Crônicas 29", familyNT: "2 Pedro 3", personalOT: "Miquéias 5", personalNT: "Lucas 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 336, month: 12, dayOfMonth: 2, familyOT: "2 Crônicas 1", familyNT: "1 João 1", personalOT: "Miquéias 6", personalNT: "Lucas 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 337, month: 12, dayOfMonth: 3, familyOT: "2 Crônicas 2", familyNT: "1 João 2", personalOT: "Miquéias 7", personalNT: "Lucas 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 338, month: 12, dayOfMonth: 4, familyOT: "2 Crônicas 3-4", familyNT: "1 João 3", personalOT: "Naum 1", personalNT: "Lucas 17", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 339, month: 12, dayOfMonth: 5, familyOT: "2 Crônicas 5-6:1-11", familyNT: "1 João 4", personalOT: "Naum 2", personalNT: "Lucas 18", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 340, month: 12, dayOfMonth: 6, familyOT: "2 Crônicas 6:12-42", familyNT: "1 João 5", personalOT: "Naum 3", personalNT: "Lucas 19", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 341, month: 12, dayOfMonth: 7, familyOT: "2 Crônicas 7", familyNT: "2 João 1", personalOT: "Habacuque 1", personalNT: "Lucas 20", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 342, month: 12, dayOfMonth: 8, familyOT: "2 Crônicas 8", familyNT: "3 João 1", personalOT: "Habacuque 2", personalNT: "Lucas 21", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 343, month: 12, dayOfMonth: 9, familyOT: "2 Crônicas 9", familyNT: "Judas 1", personalOT: "Habacuque 3", personalNT: "Lucas 22", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 344, month: 12, dayOfMonth: 10, familyOT: "2 Crônicas 10", familyNT: "Apocalipse 1", personalOT: "Sofonias 1", personalNT: "Lucas 23", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 345, month: 12, dayOfMonth: 11, familyOT: "2 Crônicas 11-12", familyNT: "Apocalipse 2", personalOT: "Sofonias 2", personalNT: "Lucas 24", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 346, month: 12, dayOfMonth: 12, familyOT: "2 Crônicas 13", familyNT: "Apocalipse 3", personalOT: "Sofonias 3", personalNT: "João 1", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 347, month: 12, dayOfMonth: 13, familyOT: "2 Crônicas 14-15", familyNT: "Apocalipse 4", personalOT: "Ageu 1", personalNT: "João 2", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 348, month: 12, dayOfMonth: 14, familyOT: "2 Crônicas 16", familyNT: "Apocalipse 5", personalOT: "Ageu 2", personalNT: "João 3", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 349, month: 12, dayOfMonth: 15, familyOT: "2 Crônicas 17", familyNT: "Apocalipse 6", personalOT: "Zacarias 1", personalNT: "João 4", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 350, month: 12, dayOfMonth: 16, familyOT: "2 Crônicas 18", familyNT: "Apocalipse 7", personalOT: "Zacarias 2", personalNT: "João 5", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 351, month: 12, dayOfMonth: 17, familyOT: "2 Crônicas 19-20", familyNT: "Apocalipse 8", personalOT: "Zacarias 3", personalNT: "João 6", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 352, month: 12, dayOfMonth: 18, familyOT: "2 Crônicas 21", familyNT: "Apocalipse 9", personalOT: "Zacarias 4", personalNT: "João 7", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 353, month: 12, dayOfMonth: 19, familyOT: "2 Crônicas 22-23", familyNT: "Apocalipse 10", personalOT: "Zacarias 5", personalNT: "João 8", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 354, month: 12, dayOfMonth: 20, familyOT: "2 Crônicas 24", familyNT: "Apocalipse 11", personalOT: "Zacarias 6", personalNT: "João 9", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 355, month: 12, dayOfMonth: 21, familyOT: "2 Crônicas 25", familyNT: "Apocalipse 12", personalOT: "Zacarias 7", personalNT: "João 10", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 356, month: 12, dayOfMonth: 22, familyOT: "2 Crônicas 26", familyNT: "Apocalipse 13", personalOT: "Zacarias 8", personalNT: "João 11", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 357, month: 12, dayOfMonth: 23, familyOT: "2 Crônicas 27-28", familyNT: "Apocalipse 14", personalOT: "Zacarias 9", personalNT: "João 12", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 358, month: 12, dayOfMonth: 24, familyOT: "2 Crônicas 29", familyNT: "Apocalipse 15", personalOT: "Zacarias 10", personalNT: "João 13", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 359, month: 12, dayOfMonth: 25, familyOT: "2 Crônicas 30", familyNT: "Apocalipse 16", personalOT: "Zacarias 11", personalNT: "João 14", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 360, month: 12, dayOfMonth: 26, familyOT: "2 Crônicas 31", familyNT: "Apocalipse 17", personalOT: "Zacarias 12-13:1", personalNT: "João 15", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 361, month: 12, dayOfMonth: 27, familyOT: "2 Crônicas 32", familyNT: "Apocalipse 18", personalOT: "Zacarias 13:2-9", personalNT: "João 16", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 362, month: 12, dayOfMonth: 28, familyOT: "2 Crônicas 33", familyNT: "Apocalipse 19", personalOT: "Zacarias 14", personalNT: "João 17", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 363, month: 12, dayOfMonth: 29, familyOT: "2 Crônicas 34", familyNT: "Apocalipse 20", personalOT: "Malaquias 1", personalNT: "João 18", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 364, month: 12, dayOfMonth: 30, familyOT: "2 Crônicas 35", familyNT: "Apocalipse 21", personalOT: "Malaquias 2", personalNT: "João 19", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" },
  { day: 365, month: 12, dayOfMonth: 31, familyOT: "2 Crônicas 36", familyNT: "Apocalipse 22", personalOT: "Malaquias 3-4", personalNT: "João 20-21", morningVerse: "", morningDevotional: "", eveningVerse: "", eveningDevotional: "", reflection: "" }
];

// Total chapters in the Bible
export const TOTAL_BIBLE_CHAPTERS = 1189;

// Calculate reading progress
export const calculateReadingProgress = (completedChaptersCount: number): number => {
  return Math.round((completedChaptersCount / TOTAL_BIBLE_CHAPTERS) * 100 * 10) / 10;
};

// Get reading by day number
export const getReadingByDay = (day: number): McCheyneReading | undefined => {
  return mcCheyneReadingPlan.find(r => r.day === day);
};

// Get today's day of year (1-365)
export const getCurrentDayOfYear = (): number => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
};

// Get current day number (always use calendar date, not "days since start")
export const getCurrentDayNumber = (): number => {
  return getCurrentDayOfYear();
};

// Get reading by calendar date
export const getReadingByDate = (month: number, day: number): McCheyneReading | undefined => {
  return mcCheyneReadingPlan.find(r => r.month === month && r.dayOfMonth === day);
};

export const getCurrentDayReading = (): McCheyneReading => {
  const now = new Date();
  const month = now.getMonth() + 1; // 0-11 to 1-12
  const day = now.getDate();
  
  const reading = getReadingByDate(month, day);
  
  // Fallback to first reading if not found
  return reading || mcCheyneReadingPlan[0];
};

// Get plan start date (not used in M'Cheyne plan, but kept for compatibility)
export const getPlanStartDate = (): Date => {
  return new Date(new Date().getFullYear(), 0, 1); // January 1st of current year
};
