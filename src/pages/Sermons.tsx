import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  saveSermon, 
  updateSermon, 
  deleteSermon, 
  getSermonsByProfile,
  Sermon 
} from '@/lib/sermonsStorage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState<Sermon | null>(null);
  const [deleteSermonId, setDeleteSermonId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    preacher: '',
    reference: '',
    notes: '',
    tags: ''
  });

  useEffect(() => {
    document.title = 'Sermões - Bíblia 365';
    loadSermons();
  }, [currentProfile]);

  const loadSermons = () => {
    if (currentProfile) {
      const loadedSermons = getSermonsByProfile(currentProfile.id);
      setSermons(loadedSermons.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      preacher: '',
      reference: '',
      notes: '',
      tags: ''
    });
    setEditingSermon(null);
  };

  const handleSubmit = () => {
    if (!currentProfile) return;
    if (!formData.title || !formData.reference) {
      toast.error('Preencha título e referência bíblica');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (editingSermon) {
      updateSermon(editingSermon.id, {
        ...formData,
        tags: tagsArray
      });
      toast.success('Sermão atualizado!');
    } else {
      saveSermon({
        ...formData,
        profileId: currentProfile.id,
        tags: tagsArray
      });
      toast.success('Sermão salvo!');
    }

    loadSermons();
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (sermon: Sermon) => {
    setEditingSermon(sermon);
    setFormData({
      title: sermon.title,
      date: sermon.date,
      preacher: sermon.preacher,
      reference: sermon.reference,
      notes: sermon.notes,
      tags: sermon.tags.join(', ')
    });
    setIsDialogOpen(true);
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
    sermon.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sermon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar ao Dashboard
        </Button>
        <div className="flex items-center justify-between mt-4">
          <div>
            <h1 className="text-4xl font-bold">Sermões</h1>
            <p className="text-muted-foreground mt-2">
              Organize suas anotações de sermões
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 w-4 h-4" />
                Novo Sermão
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSermon ? 'Editar Sermão' : 'Novo Sermão'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="title">Título do Sermão *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: O Amor de Cristo"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="preacher">Pregador</Label>
                    <Input
                      id="preacher"
                      value={formData.preacher}
                      onChange={(e) => setFormData(prev => ({ ...prev, preacher: e.target.value }))}
                      placeholder="Nome do pregador"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="reference">Referência Bíblica *</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                    placeholder="Ex: João 3:16-21"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="Ex: salvação, graça, amor"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Anotações</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Suas anotações sobre o sermão..."
                    className="min-h-[200px]"
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full">
                  {editingSermon ? 'Atualizar' : 'Salvar'} Sermão
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 w-4 h-4" />
              Adicionar Primeiro Sermão
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSermons.map((sermon) => (
            <Card key={sermon.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
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
                    <span className="font-medium text-primary">{sermon.reference}</span>
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

              {sermon.notes && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {sermon.notes}
                </p>
              )}

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleEdit(sermon)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
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
