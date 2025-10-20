import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, MessageSquare, Save, Edit, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AdminUserRow } from '@/components/AdminUserRow';

// Tipos de dados
interface Suggestion {
  id: string;
  user_id: string;
  title: string;
  module: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

interface User {
  id: string;
  email: string | undefined;
  created_at: string;
  last_sign_in_at: string | undefined;
  banned_until?: string | null;
}

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [suggestionToEdit, setSuggestionToEdit] = useState<Suggestion | null>(null);
  const [suggestionToDelete, setSuggestionToDelete] = useState<Suggestion | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


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
      const [suggestionsResult, usersResult] = await Promise.all([
        supabase.from('suggestions').select('*').order('created_at', { ascending: false }),
        supabase.functions.invoke('get-all-users')
      ]);

      if (suggestionsResult.error) throw suggestionsResult.error;
      setSuggestions((suggestionsResult.data as Suggestion[]) || []);

      if (usersResult.error) throw usersResult.error;
      const usersList = (usersResult.data as { users?: User[] } | null)?.users ?? [];
      setUsers(usersList);

    } catch (error) {
      console.error('Erro ao carregar dados do admin:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar dados do admin.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleUpdateSuggestionStatus = async (suggestion: Suggestion, status: Suggestion['status']) => {
    const originalStatus = suggestion.status;
    setSuggestions(suggestions.map(s => s.id === suggestion.id ? { ...s, status } : s));

    const { error } = await supabase.from('suggestions').update({ status }).eq('id', suggestion.id);

    if (error) {
        toast.error(`Falha ao ${status === 'approved' ? 'aprovar' : 'rejeitar'} sugestão.`);
        setSuggestions(suggestions.map(s => s.id === suggestion.id ? { ...s, status: originalStatus } : s));
    } else {
        toast.success(`Sugestão ${status === 'approved' ? 'aprovada' : 'rejeitada'}!`);
    }
  };

  const handleUpdateSuggestion = async () => {
    if (!suggestionToEdit) return;
    const { error } = await supabase.from('suggestions').update({ 
      title: suggestionToEdit.title, 
      module: suggestionToEdit.module, 
      description: suggestionToEdit.description, 
      status: suggestionToEdit.status 
    }).eq('id', suggestionToEdit.id);
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
    } catch (error) {
      const errorMessage = error instanceof Error ? `Falha ao remover usuário: ${error.message}` : 'Falha ao remover usuário.';
      toast.error(errorMessage);
    }
  };
  
  const handleUpdateUser = async () => {
    if (!userToEdit) return;

    if (newPassword) {
        if (newPassword.length < 6) {
            toast.error("A nova senha deve ter no mínimo 6 caracteres.");
            return;
        }
        try {
            const { error } = await supabase.functions.invoke('update-user-password', {
                body: { userId: userToEdit.id, password: newPassword },
            });
            if (error) throw error;
            toast.success(`Senha do usuário ${userToEdit.email} atualizada!`);
        } catch (error) {
            const errorMessage = error instanceof Error ? `Falha ao atualizar senha: ${error.message}` : 'Falha ao atualizar senha.';
            toast.error(errorMessage);
            return; 
        }
    }
    
    if(!newPassword) {
      toast.info("Nenhuma alteração de senha foi feita.");
    }

    setUserToEdit(null);
    setNewPassword('');
  };


  const handleBlockUser = async (user: User) => {
    try {
      const { error } = await supabase.functions.invoke('block-user', {
        body: { userId: user.id },
      });
      
      if (error) throw error;
      
      toast.success(`Usuário ${user.email} bloqueado com sucesso!`);
      
      // Recarregar lista de usuários
      await loadData();
    } catch (error) {
      console.error('Erro ao bloquear usuário:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao bloquear usuário.';
      toast.error(errorMessage);
    }
  };

  const handleUnblockUser = async (user: User) => {
    try {
      const { error } = await supabase.functions.invoke('unblock-user', {
        body: { userId: user.id },
      });
      
      if (error) throw error;
      
      toast.success(`Usuário ${user.email} desbloqueado com sucesso!`);
      
      // Recarregar lista de usuários
      await loadData();
    } catch (error) {
      console.error('Erro ao desbloquear usuário:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro ao desbloquear usuário.';
      toast.error(errorMessage);
    }
  };

  if (adminLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center space-y-4 text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p>Verificando permissões...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-gradient-to-r from-blue-600 to-green-500 shadow-lg">
        <div className="px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20"><ArrowLeft className="w-6 h-6" /></Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Painel de Administração</h1>
              <p className="text-sm text-white/80">Gerencie sugestões e usuários do sistema.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          
          <div className="lg:col-span-3 space-y-8">
             <div className="bg-slate-800 rounded-xl shadow-md">
              <div className="bg-blue-600 p-4 rounded-t-xl text-white font-semibold flex items-center justify-between">
                <span>Usuários Cadastrados</span>
                <span className="text-sm text-blue-100">Visualize e gerencie os usuários do sistema</span>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full bg-slate-700" />)}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700 hover:bg-slate-700/50">
                          <TableHead className="text-gray-400 text-sm uppercase">Email</TableHead>
                          <TableHead className="text-gray-400 text-sm uppercase">Status</TableHead>
                          <TableHead className="text-gray-400 text-sm uppercase">Último Login</TableHead>
                          <TableHead className="text-right font-bold w-[150px] text-gray-400 text-sm uppercase">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.length === 0 ? (
                           <TableRow><TableCell colSpan={4} className="h-24 text-center text-gray-400 border-slate-700">Nenhum usuário cadastrado.</TableCell></TableRow>
                        ) : (
                          users.map(user => (
                            <AdminUserRow 
                              key={user.id} 
                              user={user}
                              onEdit={() => setUserToEdit(user)}
                              onDelete={() => setUserToDelete(user)}
                              onBlock={handleBlockUser}
                              onUnblock={handleUnblockUser}
                            />
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
                <h2 className="text-xl font-bold mb-4 text-white">Visão Geral</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800 p-4 rounded-lg text-center">
                        <p className="text-gray-400 text-sm">Usuários Totais</p>
                        <div className="text-2xl font-bold text-white mt-1">{loading ? <Skeleton className="h-8 w-1/2 mx-auto bg-slate-700" /> : users.length}</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg text-center">
                        <p className="text-gray-400 text-sm">Total de Sugestões</p>
                        <div className="text-2xl font-bold text-white mt-1">{loading ? <Skeleton className="h-8 w-1/2 mx-auto bg-slate-700" /> : suggestions.length}</div>
                    </div>
                     <div className="bg-slate-800 p-4 rounded-lg text-center">
                        <p className="text-gray-400 text-sm">Sugestões Pendentes</p>
                        <div className="text-2xl font-bold text-amber-400 mt-1">{loading ? <Skeleton className="h-8 w-1/2 mx-auto bg-slate-700" /> : suggestions.filter(s => s.status === 'pending').length}</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg text-center">
                        <p className="text-gray-400 text-sm">Sugestões Aprovadas</p>
                        <div className="text-2xl font-bold text-green-400 mt-1">{loading ? <Skeleton className="h-8 w-1/2 mx-auto bg-slate-700" /> : suggestions.filter(s => s.status === 'approved').length}</div>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-800 rounded-xl shadow-md">
              <div className="bg-green-600 p-4 rounded-t-xl text-white font-semibold flex items-center justify-between">
                <span>Sugestões de Melhoria</span>
                <span className="text-sm text-green-100">Gerencie as sugestões enviadas</span>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full bg-slate-700" />)}
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma sugestão registrada</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {suggestions.map(suggestion => (
                      <div key={suggestion.id} className="bg-slate-900 p-4 rounded-lg shadow-sm space-y-3 border border-slate-700">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 text-xs">
                            {suggestion.module} | {new Date(suggestion.created_at).toLocaleDateString()}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full text-white ${
                            suggestion.status === 'approved' ? 'bg-green-700' :
                            suggestion.status === 'pending' ? 'bg-amber-600' : 'bg-red-700'
                          }`}>
                            {suggestion.status === 'approved' ? 'Aprovada' :
                             suggestion.status === 'pending' ? 'Pendente' : 'Rejeitada'}
                          </span>
                        </div>

                        <p className="text-gray-200 text-sm">
                          <strong>Título:</strong> {suggestion.title}<br />
                          <strong>Descrição:</strong> {suggestion.description}
                        </p>

                        <div className="flex justify-end gap-2 pt-2">
                          <Button size="sm" onClick={() => setSuggestionToEdit(suggestion)} variant="outline" className="text-xs bg-blue-600 border-blue-500 hover:bg-blue-700 text-white flex items-center gap-1">
                            <Edit className="w-3 h-3" /> Editar
                          </Button>
                          <Button size="sm" onClick={() => handleUpdateSuggestionStatus(suggestion, 'approved')} className="text-xs bg-green-600 hover:bg-green-700">
                            Aprovar
                          </Button>
                          <Button size="sm" onClick={() => setSuggestionToDelete(suggestion)} variant="destructive" className="text-xs flex items-center gap-1">
                            <Trash2 className="w-3 h-3" /> Remover
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Edição Sugestão */}
      <Dialog open={!!suggestionToEdit} onOpenChange={() => setSuggestionToEdit(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Editar Sugestão</DialogTitle>
            <DialogDescription className="text-slate-400">
                Altere os detalhes e o status da sugestão.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div><label className="text-sm font-medium">Título</label><Input className="bg-slate-700 border-slate-600" value={suggestionToEdit?.title || ''} onChange={(e) => setSuggestionToEdit(s => s ? {...s, title: e.target.value} : null)} /></div>
            <div><label className="text-sm font-medium">Módulo</label><Input className="bg-slate-700 border-slate-600" value={suggestionToEdit?.module || ''} onChange={(e) => setSuggestionToEdit(s => s ? {...s, module: e.target.value} : null)} /></div>
            <div><label className="text-sm font-medium">Descrição</label><Textarea className="bg-slate-700 border-slate-600" value={suggestionToEdit?.description || ''} onChange={(e) => setSuggestionToEdit(s => s ? {...s, description: e.target.value} : null)} rows={5} /></div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select onValueChange={(value) => setSuggestionToEdit(s => s ? {...s, status: value as Suggestion['status']} : null)} value={suggestionToEdit?.status}>
                <SelectTrigger className="bg-slate-700 border-slate-600"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
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
      
      {/* Modal Edição Usuário */}
      <Dialog open={!!userToEdit} onOpenChange={(isOpen) => { if (!isOpen) { setUserToEdit(null); setNewPassword(''); setShowPassword(false); } }}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription className="text-slate-400">
                Atualize os dados do usuário. Deixe a senha em branco para não alterá-la.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                className="bg-slate-700 border-slate-600"
                value={userToEdit?.email || ''}
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium">Nova Senha</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  className="bg-slate-700 border-slate-600 pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full px-3 text-slate-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
               <p className="text-xs text-slate-400 mt-1">Deixe em branco para não alterar a senha.</p>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
            <Button onClick={handleUpdateUser}><Save className="w-4 h-4 mr-2" /> Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Deleção Usuário */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão de Usuário</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
                Tem certeza que deseja remover o usuário <span className="font-bold text-white">{userToDelete?.email}</span>? Todos os seus dados serão perdidos. Esta ação é irreversível.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive">Confirmar Exclusão</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal Deleção Sugestão */}
      <AlertDialog open={!!suggestionToDelete} onOpenChange={() => setSuggestionToDelete(null)}>
        <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão da Sugestão</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
                Tem certeza que deseja remover esta sugestão? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSuggestion} className="bg-destructive">Confirmar Exclusão</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;

