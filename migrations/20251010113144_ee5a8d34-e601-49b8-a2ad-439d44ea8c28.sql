-- Criar tabela de perfis
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('pai', 'mae', 'filho')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('crianca', 'adolescente', 'adulto')),
  bible_version TEXT NOT NULL CHECK (bible_version IN ('ACF', 'NVI', 'NTLH')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de progresso de leitura
CREATE TABLE IF NOT EXISTS public.reading_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  chapters TEXT[] NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  xp_earned INTEGER NOT NULL DEFAULT 0,
  UNIQUE(profile_id, day)
);

-- Criar tabela de anotações por capítulo
CREATE TABLE IF NOT EXISTS public.chapter_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  chapter_ref TEXT NOT NULL,
  notes TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, chapter_ref)
);

-- Criar tabela de versículos memorizados
CREATE TABLE IF NOT EXISTS public.memorized_verses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  day INTEGER NOT NULL,
  memorized_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, day)
);

-- Criar tabela de XP e nível
CREATE TABLE IF NOT EXISTS public.profile_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  total_xp INTEGER NOT NULL DEFAULT 0,
  level INTEGER NOT NULL DEFAULT 0,
  current_streak INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memorized_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_stats ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Usuários podem ver seus próprios perfis"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar seus próprios perfis"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios perfis"
  ON public.profiles FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas RLS para reading_progress
CREATE POLICY "Usuários podem ver progresso de seus perfis"
  ON public.reading_progress FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = reading_progress.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem inserir progresso de seus perfis"
  ON public.reading_progress FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = reading_progress.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem atualizar progresso de seus perfis"
  ON public.reading_progress FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = reading_progress.profile_id 
    AND profiles.user_id = auth.uid()
  ));

-- Políticas RLS para chapter_notes
CREATE POLICY "Usuários podem ver anotações de seus perfis"
  ON public.chapter_notes FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = chapter_notes.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem inserir anotações de seus perfis"
  ON public.chapter_notes FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = chapter_notes.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem atualizar anotações de seus perfis"
  ON public.chapter_notes FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = chapter_notes.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem deletar anotações de seus perfis"
  ON public.chapter_notes FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = chapter_notes.profile_id 
    AND profiles.user_id = auth.uid()
  ));

-- Políticas RLS para memorized_verses
CREATE POLICY "Usuários podem ver versículos memorizados de seus perfis"
  ON public.memorized_verses FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = memorized_verses.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem inserir versículos memorizados de seus perfis"
  ON public.memorized_verses FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = memorized_verses.profile_id 
    AND profiles.user_id = auth.uid()
  ));

-- Políticas RLS para profile_stats
CREATE POLICY "Usuários podem ver estatísticas de seus perfis"
  ON public.profile_stats FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = profile_stats.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem inserir estatísticas de seus perfis"
  ON public.profile_stats FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = profile_stats.profile_id 
    AND profiles.user_id = auth.uid()
  ));

CREATE POLICY "Usuários podem atualizar estatísticas de seus perfis"
  ON public.profile_stats FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = profile_stats.profile_id 
    AND profiles.user_id = auth.uid()
  ));

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_chapter_notes_updated_at
  BEFORE UPDATE ON public.chapter_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_profile_stats_updated_at
  BEFORE UPDATE ON public.profile_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Função para criar profile_stats automaticamente quando um perfil é criado
CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profile_stats (profile_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_profile();