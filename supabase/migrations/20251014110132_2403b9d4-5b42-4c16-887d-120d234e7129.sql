-- Adicionar novos campos à tabela suggestions
ALTER TABLE public.suggestions 
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS module text,
ADD COLUMN IF NOT EXISTS description text;

-- Migrar dados existentes
UPDATE public.suggestions 
SET 
  title = COALESCE(title, 'Sugestão'),
  module = COALESCE(module, 'Geral'),
  description = COALESCE(description, suggestion)
WHERE title IS NULL OR module IS NULL OR description IS NULL;

-- Tornar os novos campos obrigatórios
ALTER TABLE public.suggestions 
ALTER COLUMN title SET NOT NULL,
ALTER COLUMN module SET NOT NULL,
ALTER COLUMN description SET NOT NULL;

-- Remover coluna antiga 'suggestion'
ALTER TABLE public.suggestions 
DROP COLUMN IF EXISTS suggestion;