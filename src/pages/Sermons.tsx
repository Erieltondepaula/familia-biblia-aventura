import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/hooks/useProfile';
import {
  deleteSermon,
  getSermonsByProfile,
  Sermon
} from '@/lib/sermonsStorage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  BookOpen,
  Calendar,
  User,
  Search
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Sermons = () => {
  const navigate = useNavigate();
  const { currentProfile } = useProfile();
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteSermonId, setDeleteSermonId] = useState<string | null>(null);

  const loadSermons = useCallback(() => {
    if (currentProfile) {
      const loadedSermons = getSermonsByProfile(currentProfile.id);
      setSermons(loadedSermons.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
  }, [currentProfile]);

  useEffect(() => {
    document.title = 'Sermões - Bíblia 365';
    loadSermons();
  }, [currentProfile, loadSermons]);

  const handleEdit = (sermonId: string) => {
    navigate(`/sermon-editor/${sermonId}`);
  };

  const handleCreate = () => {
    navigate('/sermon-editor');
  };

  const handleDelete = () => {
    if (deleteSermonId) {
      deleteSermon(deleteSermonId);
      loadSermons();
      toast.success('Sermão excluído!');
      setDeleteSermonId(null);
    }
  };

  const filteredSermons = sermons.filter(sermon =>
    sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.preacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.textBase.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar ao Dashboard
        </Button>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Sermões</h1>
            <p className="text-muted-foreground mt-2">
              Organize suas anotações de sermões
            </p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 w-4 h-4" />
            Novo Sermão
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Buscar sermões..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sermons List */}
      {filteredSermons.length === 0 ? (
        <Card className="p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">
            {searchQuery ? 'Nenhum sermão encontrado' : 'Nenhum sermão ainda'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery
              ? 'Tente buscar com outros termos'
              : 'Comece adicionando suas anotações de sermões'
            }
          </p>
          {!searchQuery && (
            <Button onClick={handleCreate}>
              <Plus className="mr-2 w-4 h-4" />
              Adicionar Primeiro Sermão
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <Card key={sermon.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-grow mb-4">
                <h3 className="text-xl font-semibold mb-2">{sermon.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(sermon.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  {sermon.preacher && (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{sermon.preacher}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span className="font-medium text-primary">{sermon.textBase}</span>
                  </div>
                </div>
              </div>

              {sermon.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {sermon.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {sermon.introduction && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {sermon.introduction.replace(/<[^>]*>?/gm, '')} {/* Remove HTML tags para preview */}
                </p>
              )}

              <div className="mt-auto flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEdit(sermon.id)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Ver / Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteSermonId(sermon.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteSermonId} onOpenChange={() => setDeleteSermonId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Sermão?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O sermão será permanentemente excluído.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sermons;