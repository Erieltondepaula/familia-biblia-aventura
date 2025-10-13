-- ============= ENUM DE ROLES =============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- ============= TABELA DE ROLES DE USUÁRIOS (SEGURANÇA) =============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para user_roles
CREATE POLICY "Usuários podem ver seus próprios roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Apenas admins podem inserir roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
  
CREATE POLICY "Admins podem gerenciar todos os roles"
    ON public.user_roles FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));


-- ============= FUNÇÃO PARA VERIFICAR ROLE (SECURITY DEFINER) =============
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- ============= TABELA DE SUGESTÕES (ATUALIZADA) =============
CREATE TABLE public.suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_email TEXT NOT NULL,
  title TEXT NOT NULL,
  module TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem criar suas sugestões"
  ON public.suggestions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem ver suas próprias sugestões"
  ON public.suggestions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins podem ver todas as sugestões"
  ON public.suggestions FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar sugestões"
  ON public.suggestions FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar sugestões"
  ON public.suggestions FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));


-- ============= TABELA DE DEVOCIONAIS =============
CREATE TABLE public.devotional_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  day INTEGER NOT NULL,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (profile_id, day)
);

ALTER TABLE public.devotional_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem gerenciar devocionais de seus perfis"
  ON public.devotional_progress FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = devotional_progress.profile_id
      AND profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = devotional_progress.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- ============= STORAGE BUCKET PARA AVATARES =============
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas para o bucket de avatares
CREATE POLICY "Avatares são publicamente visíveis"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Usuários podem fazer upload de seus avatares"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Usuários podem atualizar seus avatares"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Usuários podem deletar seus avatares"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============= ADICIONAR CAMPO AVATAR_URL AO PERFIL =============
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- ============= INSERIR ADMIN INICIAL =============
-- Nota: Este INSERT só funcionará após o usuário fazer login pela primeira vez
-- O email erieltondepaulamelo@gmail.com precisará fazer login primeiro
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'erieltondepaulamelo@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;