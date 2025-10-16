-- Corrige registros existentes que usam o nome 'BKJ 1611' em vez do código 'BKJ1611'
BEGIN;

UPDATE public.profiles
SET bible_version = 'BKJ1611'
WHERE bible_version = 'BKJ 1611';

COMMIT;
