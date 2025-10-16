import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';

// Passo 1: Importamos a imagem de fundo
import heroBackground from '@/assets/hero-family.jpg';

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
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Passo 2: A imagem é aplicada como fundo */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Passo 3: Adicionamos uma camada escura para garantir a legibilidade do texto */}
      <div className="absolute inset-0 w-full h-full bg-black/60" />

      {/* O card de login fica por cima de tudo */}
      <Card className="relative w-full max-w-md mx-4 shadow-elevated border-2 border-white/10 bg-background/80 backdrop-blur-sm dark:bg-card/70 animate-scale-in transition-all duration-300 hover:shadow-2xl">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4 shadow-lg transition-transform hover:scale-110">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            {isPasswordReset ? 'Redefinir Senha' : 'Jornada Bíblica'}
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {isPasswordReset
              ? 'Insira seu e-mail para receber o link de redefinição.'
              : isSigningUp
              ? 'Crie sua conta para começar a jornada.'
              : 'Entre para continuar sua jornada de fé.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-left block">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="h-11 text-base"
              />
            </div>
            {!isPasswordReset && (
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-left block">Senha</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className="h-11 text-base"
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
          <div className="text-sm text-center mt-4">
            <Button variant="link" className="text-muted-foreground" onClick={() => {
                if (isPasswordReset) {
                    setIsPasswordReset(false);
                } else {
                    setIsPasswordReset(true);
                    setIsSigningUp(false);
                }
            }}>
              {isPasswordReset ? 'Voltar para o Login' : 'Esqueceu a senha?'}
            </Button>
          </div>
          <div className="relative my-4">
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
            {isSigningUp
              ? 'Já tem uma conta? Fazer login'
              : 'Não tem uma conta? Criar agora'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;