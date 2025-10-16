import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Shield, Lock, Unlock } from "lucide-react";

interface User {
  id: string;
  email: string | undefined;
  created_at: string;
  last_sign_in_at: string | undefined;
}

interface AdminUserRowProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete: (user: User) => void;
  onBlock?: (user: User) => void;
  onUnblock?: (user: User) => void;
}

export const AdminUserRow = ({ user, onEdit, onDelete, onBlock, onUnblock }: AdminUserRowProps) => {
  const isActive = user.last_sign_in_at;
  const lastLoginDate = user.last_sign_in_at 
    ? new Date(user.last_sign_in_at).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Nunca';

  return (
    <TableRow className="hover:bg-muted/50 transition-colors group">
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-muted-foreground" />
          {user.email}
        </div>
      </TableCell>
      <TableCell>
        <Badge 
          variant={isActive ? 'default' : 'secondary'}
          className="hover-scale transition-all"
        >
          {isActive ? '🟢 Ativo' : '⚪ Inativo'}
        </Badge>
      </TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {lastLoginDate}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover-scale hover:bg-blue-500/10" 
              onClick={() => onEdit(user)}
              title="Editar usuário"
            >
              <Edit className="w-4 h-4 text-blue-500" />
            </Button>
          )}
          {onBlock && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover-scale hover:bg-amber-500/10"
              onClick={() => onBlock(user)}
              title="Bloquear usuário"
            >
              <Lock className="w-4 h-4 text-amber-500" />
            </Button>
          )}
          {onUnblock && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover-scale hover:bg-green-500/10"
              onClick={() => onUnblock(user)}
              title="Desbloquear usuário"
            >
              <Unlock className="w-4 h-4 text-green-500" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hover-scale hover:bg-destructive/10" 
            onClick={() => onDelete(user)}
            title="Remover usuário"
          >
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
