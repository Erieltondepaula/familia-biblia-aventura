-- Remove a constraint antiga que está bloqueando BKJ1611 e NAA
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_bible_version_check;

-- Adiciona nova constraint com todas as 5 versões bíblicas
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_bible_version_check 
CHECK (bible_version IN ('ACF', 'NVI', 'NTLH', 'BKJ1611', 'NAA'));