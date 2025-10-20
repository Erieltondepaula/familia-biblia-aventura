import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Verificar se o usuário é admin
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    
    if (userError || !user) {
      console.error('Erro de autenticação:', userError);
      return new Response(
        JSON.stringify({ error: 'Não autorizado' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verificar se o usuário tem role de admin
    const { data: roles, error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (rolesError || !roles) {
      console.error('Erro ao verificar role de admin:', rolesError);
      return new Response(
        JSON.stringify({ error: 'Acesso negado. Apenas administradores podem bloquear usuários.' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Pegar o userId do body
    const { userId } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'userId é obrigatório' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Prevenir auto-bloqueio
    if (userId === user.id) {
      return new Response(
        JSON.stringify({ error: 'Você não pode bloquear a si mesmo' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Admin ${user.email} bloqueando usuário ${userId}`);

    // Bloquear o usuário usando a API de admin do Supabase
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      ban_duration: '876000h' // ~100 anos (bloqueio permanente)
    });

    if (updateError) {
      console.error('Erro ao bloquear usuário:', updateError);
      throw updateError;
    }

    console.log(`Usuário ${userId} bloqueado com sucesso`);

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Usuário bloqueado com sucesso' 
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro na função block-user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ error: `Falha ao bloquear usuário: ${errorMessage}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
