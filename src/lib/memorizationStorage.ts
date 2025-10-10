// Storage for memorized verses per profile per day
export interface MemorizedVerse {
  day: number;
  date: string; // ISO date string for the day it was memorized
}

import { 
  markVerseAsMemorized as markVerseAsMemorizedSupabase,
  isVerseMemorized as isVerseMemorizedSupabase 
} from './supabaseStorage';

export const markVerseAsMemorized = async (profileId: string, day: number): Promise<void> => {
  await markVerseAsMemorizedSupabase(profileId, day);
};

export const isVerseMemorized = async (profileId: string, day: number): Promise<boolean> => {
  return isVerseMemorizedSupabase(profileId, day);
};
