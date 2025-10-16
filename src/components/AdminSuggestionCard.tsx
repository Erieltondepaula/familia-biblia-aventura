import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, CheckCircle, XCircle } from "lucide-react";

interface Suggestion {
  id: string;
  user_email: string;
  title: string;
  module: string;
  description: string;
  status: string;
  created_at: string;
}

interface AdminSuggestionCardProps {
  suggestion: Suggestion;
  onEdit: (suggestion: Suggestion) => void;
  onApprove?: (suggestion: Suggestion) => void;
  onReject?: (suggestion: Suggestion) => void;
}

export const AdminSuggestionCard = ({ suggestion, onEdit, onApprove, onReject }: AdminSuggestionCardProps) => {
  const borderColor = 
    suggestion.status === 'approved' ? 'hsl(var(--success))' : 
    suggestion.status === 'rejected' ? 'hsl(var(--destructive))' : 
    'hsl(var(--border))';

  const statusLabel = 
    suggestion.status === 'approved' ? '✓ Aprovada' :
    suggestion.status === 'rejected' ? '✗ Rejeitada' :
    '⏳ Pendente';

  const statusVariant = 
    suggestion.status === 'approved' ? 'default' :
    suggestion.status === 'rejected' ? 'destructive' :
    'secondary';

  return (
    <Card 
      className="border-l-4 hover-lift animate-scale-in transition-all duration-300 group" 
      style={{ borderColor }}
    >
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2 gap-2">
          <span className="font-bold text-base flex-1">{suggestion.title}</span>
          <Badge variant={statusVariant} className="hover-scale">
            {statusLabel}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {suggestion.module}
          </Badge>
          <p className="text-xs text-muted-foreground">
            {suggestion.user_email} • {new Date(suggestion.created_at).toLocaleDateString('pt-BR')}
          </p>
        </div>
        
        <p className="text-sm p-3 bg-muted/50 rounded-md border border-border/50 mb-4">
          {suggestion.description}
        </p>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="sm" 
            variant="outline" 
            className="btn-interactive hover-lift flex-1" 
            onClick={() => onEdit(suggestion)}
          >
            <Edit className="w-4 h-4 mr-2" /> 
            Editar
          </Button>
          {suggestion.status === 'pending' && onApprove && (
            <Button 
              size="sm" 
              variant="default"
              className="btn-interactive hover-lift bg-success hover:bg-success/90" 
              onClick={() => onApprove(suggestion)}
            >
              <CheckCircle className="w-4 h-4 mr-2" /> 
              Aprovar
            </Button>
          )}
          {suggestion.status === 'pending' && onReject && (
            <Button 
              size="sm" 
              variant="destructive"
              className="btn-interactive hover-lift" 
              onClick={() => onReject(suggestion)}
            >
              <XCircle className="w-4 h-4 mr-2" /> 
              Rejeitar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
