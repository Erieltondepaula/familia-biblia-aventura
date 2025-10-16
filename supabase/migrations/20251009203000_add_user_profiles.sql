-- Tabela para armazenar os perfis dos usuários
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  age integer NOT NULL,
  role text NOT NULL,
  difficulty text NOT NULL,
  -- LINHA CORRIGIDA ABAIXO --
  bible_version text NOT NULL CHECK (bible_version IN ('ACF', 'NVI', 'NTLH', 'BKJ1611', 'NAA')),
  created_at timestamptz DEFAULT now()
);

-- Habilitar Segurança a Nível de Linha (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas seus próprios perfis.
CREATE POLICY "Users can view their own profiles."
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Usuários podem criar perfis para si mesmos.
CREATE POLICY "Users can create their own profiles."
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política: Usuários podem atualizar seus próprios perfis.
CREATE POLICY "Users can update their own profiles."
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Política: Usuários podem deletar seus próprios perfis.
CREATE POLICY "Users can delete their own profiles."
  ON public.profiles FOR DELETE
  USING (auth.uid() = user_id);