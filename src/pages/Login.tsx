import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSigningUp) {
      const { error } = await supabase.auth.signUp({ email, password });
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
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-sm mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Jornada Bíblica</CardTitle>
          <CardDescription>
            {isSigningUp ? 'Crie uma nova conta para começar' : 'Acesse sua conta para continuar'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            <Input
              type="email" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} disabled={loading} required
            />
            <Input
              type="password" placeholder="Senha (mínimo 6 caracteres)" value={password}
              onChange={(e) => setPassword(e.target.value)} disabled={loading} required
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Aguarde...' : (isSigningUp ? 'Criar Conta' : 'Entrar')}
            </Button>
          </form>
          <Button variant="link" onClick={() => setIsSigningUp(!isSigningUp)} className="w-full mt-4">
            {isSigningUp ? 'Já tem uma conta? Entrar' : 'Não tem uma conta? Criar agora'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;