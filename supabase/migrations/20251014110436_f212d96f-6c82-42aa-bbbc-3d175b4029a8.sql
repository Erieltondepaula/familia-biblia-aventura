-- Adicionar novos campos à tabela suggestions
ALTER TABLE public.suggestions 
ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT 'Sugestão Geral',
ADD COLUMN IF NOT EXISTS module text NOT NULL DEFAULT 'Geral',
ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT 'Descrição não fornecida';

-- Remover defaults após adicionar
ALTER TABLE public.suggestions 
ALTER COLUMN title DROP DEFAULT,
ALTER COLUMN module DROP DEFAULT,
ALTER COLUMN description DROP DEFAULT;