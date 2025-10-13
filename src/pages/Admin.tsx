import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface Suggestion {
  id: string;
  user_email: string;
  suggestion: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Administração | Jornada Bíblica';
  }, []);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast.error('Acesso restrito ao administrador.');
      navigate('/dashboard');
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadSuggestions();
    }
  }, [isAdmin]);

  const loadSuggestions = async () => {
    try {
      const { data, error } = await supabase
        .from('suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Erro ao carregar sugestões:', error);
      toast.error('Erro ao carregar sugestões');
    } finally {
      setLoading(false);
    }
  };

  const updateSuggestionStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('suggestions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      
      setSuggestions(prev => 
        prev.map(s => s.id === id ? { ...s, status } : s)
      );
      toast.success(`Sugestão marcada como ${status === 'approved' ? 'aprovada' : 'rejeitada'}`);
    } catch (error) {
      console.error('Erro ao atualizar sugestão:', error);
      toast.error('Erro ao atualizar sugestão');
    }
  };

  if (adminLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p>Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-hero text-white shadow-elevated">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="w-6 h-6" />
                Painel de Administração
              </h1>
              <p className="text-sm text-white/80">Gerencie sugestões e usuários</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid gap-6">
          {/* Estatísticas Rápidas */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Sugestões
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{suggestions.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-amber-600">
                  {suggestions.filter(s => s.status === 'pending').length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Aprovadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {suggestions.filter(s => s.status === 'approved').length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Sugestões */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Sugestões de Melhoria
              </CardTitle>
              <CardDescription>
                Gerencie as sugestões enviadas pelos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : suggestions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma sugestão registrada ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {suggestions.map(suggestion => (
                    <Card key={suggestion.id} className="border-2">
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-sm">
                                {suggestion.user_email}
                              </span>
                              <Badge variant={
                                suggestion.status === 'approved' ? 'default' :
                                suggestion.status === 'rejected' ? 'destructive' :
                                'secondary'
                              }>
                                {suggestion.status === 'approved' ? 'Aprovada' :
                                 suggestion.status === 'rejected' ? 'Rejeitada' :
                                 'Pendente'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {new Date(suggestion.created_at).toLocaleString('pt-BR')}
                            </p>
                            <p className="text-base">{suggestion.suggestion}</p>
                          </div>
                        </div>
                        
                        {suggestion.status === 'pending' && (
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => updateSuggestionStatus(suggestion.id, 'approved')}
                              className="flex-1"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => updateSuggestionStatus(suggestion.id, 'rejected')}
                              className="flex-1"
                            >
                              <XCircle className="w-4 h-4 mr-2" />
                              Rejeitar
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
