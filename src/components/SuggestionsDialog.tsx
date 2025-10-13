import { useState } from 'react';
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
import { Lightbulb, Send } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const SuggestionsDialog = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!user || !suggestion.trim()) {
      toast.error('Por favor, escreva sua sugestão');
      return;
    }

    setSending(true);
    try {
      const { error } = await supabase
        .from('suggestions')
        .insert({
          user_id: user.id,
          user_email: user.email || 'Usuário sem email',
          suggestion: suggestion.trim()
        });

      if (error) throw error;

      toast.success('Sua sugestão foi registrada com sucesso!', {
        description: 'Obrigado por ajudar a melhorar o sistema!'
      });
      
      setSuggestion('');
      setOpen(false);
    } catch (error) {
      console.error('Erro ao enviar sugestão:', error);
      toast.error('Erro ao enviar sugestão. Tente novamente.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Lightbulb className="w-5 h-5" />
        </Button>
      </DialogTrigger>
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
          <Textarea
            placeholder="Descreva sua sugestão de melhoria ou correção..."
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            rows={6}
            className="resize-none"
          />
          <Button 
            onClick={handleSubmit} 
            disabled={sending || !suggestion.trim()}
            className="w-full"
          >
            <Send className="w-4 h-4 mr-2" />
            {sending ? 'Enviando...' : 'Enviar Sugestão'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
