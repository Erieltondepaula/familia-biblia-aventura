/// <reference types="https://esm.sh/v135/@supabase/functions-js@2.4.1/src/edge-runtime.d.ts" />

// O erro "Cannot find module" aqui é um falso positivo do editor.
// O ambiente Deno da Supabase encontrará este módulo durante a execução.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient, AuthApiError } from "https://esm.sh/@supabase/supabase-js@2.42.0";

// Headers CORS para permitir a comunicação com seu app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Função auxiliar para criar respostas de erro padronizadas
function createErrorResponse(message: string, status: number) {
  return new Response(
    JSON.stringify({ error: message }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: status,
    }
  );
}

async function handler(req: Request) {
  // Responde à solicitação de verificação prévia (preflight) do CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders, status: 200 });
  }

  console.log(`[${new Date().toISOString()}] Function 'update-user-password' invoked.`);

  try {
    // O erro "Cannot find name 'Deno'" aqui é um falso positivo.
    // 'Deno' é um objeto global disponível no ambiente de Edge Functions da Supabase.
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Error: Missing Supabase environment variables.');
      return createErrorResponse('Variáveis de ambiente do Supabase não configuradas.', 500);
    }

    const { userId, password } = await req.json();

    // Validação de entrada mais específica
    if (!userId || !password) {
      console.warn(`Validation Error: Missing required parameters.`);
      const missingParams = [!userId && "userId", !password && "password"].filter(Boolean).join(", ");
      return createErrorResponse(`Parâmetros obrigatórios ausentes: ${missingParams}.`, 400);
    }

    if (password.length < 6) {
      console.warn(`Validation Error: Password for userId ${userId} is too short.`);
      return createErrorResponse("A senha deve ter no mínimo 6 caracteres.", 400);
    }

    // Cria um cliente admin do Supabase para poder alterar dados de usuários
    const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

    // Atualiza o usuário pelo ID
    console.log(`Attempting to update password for userId: ${userId}`);
    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
      userId,
      { password: password }
    );

    if (error) {
      // Propaga o erro do Supabase para ser tratado no catch
      throw error;
    }

    console.log(`Successfully updated password for user: ${data.user.id}`);
    return new Response(JSON.stringify(data.user), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('An error occurred in the handler:', err);
    // O erro "'err' is of type 'unknown'" é um comportamento padrão do TypeScript.
    // O código abaixo já trata isso corretamente com 'instanceof'.
    if (err instanceof AuthApiError) {
      return createErrorResponse(err.message, err.status);
    }

    // Fallback para outros tipos de erro
    const errorMessage = err instanceof Error ? err.message : "Erro interno do servidor.";
    return createErrorResponse(errorMessage, 500);
  }
}

serve(handler);

