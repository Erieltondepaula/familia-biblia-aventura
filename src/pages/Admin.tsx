import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MessageSquare, Edit, Trash2, Save } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Suggestion {
  id: string;
  user_email: string;
  title: string;
  module: string;
  description: string;
  status: string;
  created_at: string;
}

interface User {
  id: string;
  email: string | undefined;
  created_at: string;
  last_sign_in_at: string | undefined;
}

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [suggestionToDelete, setSuggestionToDelete] = useState<Suggestion | null>(null);
  const [suggestionToEdit, setSuggestionToEdit] = useState<Suggestion | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  useEffect(() => {
    document.title = 'Administração | Jornada Bíblica';
    if (!adminLoading && !isAdmin) {
      toast.error('Acesso restrito ao administrador.');
      navigate('/dashboard');
    } else if (isAdmin) {
      loadData();
    }
  }, [isAdmin, adminLoading, navigate]);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: suggestionsData, error: suggestionsError } = await supabase
        .from('suggestions')
        .select('*')
        .order('created_at', { ascending: false });

      if (suggestionsError) throw suggestionsError;
      setSuggestions(suggestionsData || []);

      // CORREÇÃO AQUI (Erro 1): Especificamos o tipo de retorno da função
      const { data: usersData, error: functionsError } = await supabase.functions.invoke<{ users: User[] }>('get-all-users');
      
      if (functionsError) throw functionsError;

      // Agora o `u` aqui é automaticamente reconhecido como do tipo `User`, sem precisar do `any`
      if (usersData && usersData.users) {
        setUsers(usersData.users);
      }

    } catch (error) { // CORREÇÃO AQUI (Erro 2): Removemos o `:any` e tratamos o erro de forma segura
      console.error('Erro ao carregar dados do admin:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar dados do admin.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSuggestion = async () => {
    if (!suggestionToEdit) return;
    const { error } = await supabase.from('suggestions').update({ title: suggestionToEdit.title, module: suggestionToEdit.module, description: suggestionToEdit.description, status: suggestionToEdit.status }).eq('id', suggestionToEdit.id);
    if (error) {
      toast.error('Falha ao atualizar sugestão.');
    } else {
      toast.success('Sugestão atualizada!');
      setSuggestions(suggestions.map(s => s.id === suggestionToEdit.id ? suggestionToEdit : s));
      setSuggestionToEdit(null);
    }
  };

  const handleDeleteSuggestion = async () => {
    if (!suggestionToDelete) return;
    const { error } = await supabase.from('suggestions').delete().eq('id', suggestionToDelete.id);
    if (error) {
      toast.error('Falha ao remover sugestão.');
    } else {
      toast.success('Sugestão removida!');
      setSuggestions(suggestions.filter(s => s.id !== suggestionToDelete.id));
      setSuggestionToDelete(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { userId: userToDelete.id },
      });

      if (error) throw error;

      toast.success('Usuário removido!');
      setUsers(users.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
    } catch (error) { // CORREÇÃO AQUI (Erro 3): Removemos o `:any` e tratamos o erro de forma segura
      const errorMessage = error instanceof Error ? `Falha ao remover usuário: ${error.message}` : 'Falha ao remover usuário.';
      toast.error(errorMessage);
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

  // O restante do código (a parte visual) continua o mesmo
  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-gradient-hero text-white shadow-elevated animate-fade-in">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 btn-interactive"><ArrowLeft className="w-6 h-6" /></Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6" />Painel de Administração</h1>
              <p className="text-sm text-white/80">Gerencie sugestões e usuários do sistema.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Estatísticas Rápidas */}
        <section>
            <h2 className="text-xl font-bold mb-4">Visão Geral</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
                <Card className="hover-lift"><CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Usuários Totais</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{users.length}</div></CardContent></Card>
                <Card className="hover-lift"><CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Total de Sugestões</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{suggestions.length}</div></CardContent></Card>
                <Card className="hover-lift"><CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Sugestões Pendentes</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-amber-600">{suggestions.filter(s => s.status === 'pending').length}</div></CardContent></Card>
                <Card className="hover-lift"><CardHeader><CardTitle className="text-sm font-medium text-muted-foreground">Sugestões Aprovadas</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold text-green-600">{suggestions.filter(s => s.status === 'approved').length}</div></CardContent></Card>
            </div>
        </section>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Usuários Cadastrados */}
          <Card className="lg:col-span-3 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> Usuários Cadastrados</CardTitle>
              <CardDescription>Visualize e gerencie os usuários do sistema.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? <Skeleton className="h-48 w-full" /> : (
                <div className="max-h-[600px] overflow-y-auto pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Último Login</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map(user => (
                        <TableRow key={user.id} className="hover:bg-muted/50 transition-colors">
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>
                            {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString('pt-BR') : 'Nunca'}
                          </TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button variant="ghost" size="icon" className="hover-scale"><Edit className="w-4 h-4 text-blue-500" /></Button>
                            <Button variant="ghost" size="icon" className="hover-scale" onClick={() => setUserToDelete(user)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sugestões de Melhoria */}
          <Card className="lg:col-span-2 hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Sugestões de Melhoria</CardTitle>
              <CardDescription>Gerencie as sugestões enviadas.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full" />)}</div> : suggestions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground"><MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" /><p>Nenhuma sugestão registrada</p></div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {suggestions.map(suggestion => (
                    <Card key={suggestion.id} className="border-l-4 hover-lift animate-scale-in" style={{ borderColor: suggestion.status === 'approved' ? 'hsl(var(--success))' : suggestion.status === 'rejected' ? 'hsl(var(--destructive))' : 'hsl(var(--border))' }}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-base">{suggestion.title}</span>
                          <Badge variant={suggestion.status === 'approved' ? 'default' : suggestion.status === 'rejected' ? 'destructive' : 'secondary'} className="hover-scale">{suggestion.status}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{suggestion.user_email} em {new Date(suggestion.created_at).toLocaleString('pt-BR')}</p>
                        <p className="text-sm p-2 bg-muted/50 rounded-md">{suggestion.description}</p>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="btn-interactive hover-lift" onClick={() => setSuggestionToEdit(suggestion)}><Edit className="w-4 h-4 mr-2" /> Editar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modal de Edição de Sugestão */}
      <Dialog open={!!suggestionToEdit} onOpenChange={() => setSuggestionToEdit(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Sugestão</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div><label className="text-sm font-medium">Título</label><Input value={suggestionToEdit?.title || ''} onChange={(e) => setSuggestionToEdit(s => s ? {...s, title: e.target.value} : null)} /></div>
            <div><label className="text-sm font-medium">Módulo</label><Input value={suggestionToEdit?.module || ''} onChange={(e) => setSuggestionToEdit(s => s ? {...s, module: e.target.value} : null)} /></div>
            <div><label className="text-sm font-medium">Descrição</label><Textarea value={suggestionToEdit?.description || ''} onChange={(e) => setSuggestionToEdit(s => s ? {...s, description: e.target.value} : null)} rows={5} /></div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select onValueChange={(value) => setSuggestionToEdit(s => s ? {...s, status: value} : null)} value={suggestionToEdit?.status}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="approved">Aprovada</SelectItem>
                  <SelectItem value="rejected">Rejeitada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
            <Button onClick={handleUpdateSuggestion}><Save className="w-4 h-4 mr-2" /> Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmação - Remover Sugestão */}
      <AlertDialog open={!!suggestionToDelete} onOpenChange={() => setSuggestionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle><AlertDialogDescription>Tem certeza que deseja remover esta sugestão? Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSuggestion} className="bg-destructive">Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de Confirmação - Remover Usuário */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Confirmar Exclusão de Usuário</AlertDialogTitle><AlertDialogDescription>Tem certeza que deseja remover o usuário <span className="font-bold">{userToDelete?.email}</span>? Todos os seus dados serão perdidos. Esta ação é irreversível.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive">Confirmar Exclusão</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;