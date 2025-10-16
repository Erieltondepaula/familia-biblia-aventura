// Caminho: supabase/functions/_shared/cors.ts

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Permite que seu app acesse a função
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};