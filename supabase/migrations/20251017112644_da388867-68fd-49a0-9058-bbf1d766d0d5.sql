-- Remove user_email column from suggestions table to prevent PII duplication
-- User emails should be retrieved dynamically from auth system when needed
ALTER TABLE public.suggestions 
DROP COLUMN IF EXISTS user_email;