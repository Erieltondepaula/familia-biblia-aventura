import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lightbulb, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SuggestionsDialog = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [module, setModule] = useState('');
  const [description, setDescription] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!user || !title.trim() || !module.trim() || !description.trim()) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase
        .from('suggestions')
        .insert({
          user_id: user.id,
          user_email: user.email || 'Usuário sem email',
          title,
          module,
          description,
        });

      if (error) throw error;

      toast.success('Sua sugestão foi registrada com sucesso!', {
        description: 'Obrigado por ajudar a melhorar o sistema!'
      });
      
      setTitle('');
      setModule('');
      setDescription('');
      setOpen(false);
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      toast.error('Erro ao enviar sugestão. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={setOpen}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="default" size="icon" className="relative bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all">
                <Lightbulb className="w-5 h-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Enviar Sugestão de Melhoria</p>
          </TooltipContent>
        </Tooltip>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Deixar Sugestão de Melhoria
          </DialogTitle>
          <DialogDescription>
            Compartilhe suas ideias para tornar o Jornada Bíblica ainda melhor!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="title" className="text-sm font-medium">Título</label>
            <Input
              id="title"
              placeholder="Ex: Melhoria na tela de leitura"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="module" className="text-sm font-medium">Módulo</label>
            <Select onValueChange={setModule} value={module}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dashboard">Dashboard</SelectItem>
                <SelectItem value="Leitura">Leitura</SelectItem>
                <SelectItem value="Perfis">Perfis</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
                <SelectItem value="Devocional">Devocional</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-medium">Descrição da Melhoria</label>
            <Textarea
              id="description"
              placeholder="Descreva sua sugestão em detalhes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          <Button 
            onClick={handleSubmit} 
            disabled={sending || !title.trim() || !module.trim() || !description.trim()}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            {sending ? 'Enviando...' : 'Enviar Sugestão'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </TooltipProvider>
  );
};