export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bible_books: {
        Row: {
          book_key: string
          book_name: string
          book_order: number
          created_at: string | null
          id: string
          testament: string
        }
        Insert: {
          book_key: string
          book_name: string
          book_order: number
          created_at?: string | null
          id?: string
          testament: string
        }
        Update: {
          book_key?: string
          book_name?: string
          book_order?: number
          created_at?: string | null
          id?: string
          testament?: string
        }
        Relationships: []
      }
      bible_chapters: {
        Row: {
          book_id: string
          chapter_number: number
          created_at: string | null
          id: string
        }
        Insert: {
          book_id: string
          chapter_number: number
          created_at?: string | null
          id?: string
        }
        Update: {
          book_id?: string
          chapter_number?: number
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bible_chapters_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "bible_books"
            referencedColumns: ["id"]
          },
        ]
      }
      bible_verses: {
        Row: {
          chapter_id: string
          created_at: string | null
          id: string
          text: string
          verse_number: number
        }
        Insert: {
          chapter_id: string
          created_at?: string | null
          id?: string
          text: string
          verse_number: number
        }
        Update: {
          chapter_id?: string
          created_at?: string | null
          id?: string
          text?: string
          verse_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "bible_verses_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "bible_chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      // ADICIONADO A NOVA TABELA 'profiles' ABAIXO
      profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          age: number
          role: string
          difficulty: string
          bible_version: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          age: number
          role: string
          difficulty: string
          bible_version: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          age?: number
          role?: string
          difficulty?: string
          bible_version?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// O resto do arquivo permanece o mesmo...