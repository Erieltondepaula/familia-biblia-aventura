import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isPasswordReset) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) toast.error(error.message);
      else toast.info('Verifique seu e-mail para redefinir a senha.');
      setIsPasswordReset(false);
    } else if (isSigningUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) toast.error(error.message);
      else toast.info('Verifique seu e-mail para confirmar a conta.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else {
        toast.success('Login realizado com sucesso!');
        navigate('/dashboard');
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden animate-fade-in">
      {/* Background gradient - Tema cristão */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-amber-50 to-purple-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-3xl pulse-subtle" />
      </div>

      {/* Login card */}
      <Card className="relative w-full max-w-md mx-4 shadow-elevated border-2 border-border/50 backdrop-blur-sm bg-background/95 animate-scale-in hover-lift">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4 shadow-card hover-scale">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            {isPasswordReset ? 'Redefinir Senha' : 'Bem-vindo ao Jornada Bíblica'}
          </CardTitle>
          <CardDescription className="text-base">
            {isPasswordReset
              ? 'Insira seu e-mail para receber o link de redefinição'
              : isSigningUp
              ? 'Crie uma nova conta para começar sua jornada espiritual'
              : 'Entre para continuar sua jornada de fé'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="h-11 transition-all focus:scale-[1.02]"
              />
            </div>
            {!isPasswordReset && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Senha</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="h-11 transition-all focus:scale-[1.02]"
                />
              </div>
            )}
            <Button type="submit" disabled={loading} className="w-full h-11 text-base font-semibold btn-interactive hover-lift">
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Aguarde...
                </>
              ) : isPasswordReset ? (
                'Enviar Link'
              ) : isSigningUp ? (
                'Criar Conta'
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
          {!isPasswordReset && (
            <div className="text-sm text-center mt-4">
              <Button variant="link" className="hover-scale" onClick={() => setIsPasswordReset(true)}>
                Esqueceu a senha?
              </Button>
            </div>
          )}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">ou</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => {
            setIsSigningUp(!isSigningUp);
            setIsPasswordReset(false);
          }} className="w-full h-11 btn-interactive hover-lift">
            {isPasswordReset
              ? 'Voltar para o Login'
              : isSigningUp
              ? 'Já tem uma conta? Fazer login'
              : 'Não tem conta? Criar agora'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;