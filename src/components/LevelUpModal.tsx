import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Trophy, Sparkles, Star } from "lucide-react";
import { getLevelName, getLevelDescription } from "@/lib/progressCalculations";

interface LevelUpModalProps {
  level: number;
  show: boolean;
  onClose: () => void;
}

const LevelUpModal = ({ level, show, onClose }: LevelUpModalProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (show) {
      setOpen(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setOpen(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) onClose();
    }}>
      <DialogContent className="max-w-md">
        <div className="text-center py-6">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-glory opacity-30 blur-3xl rounded-full animate-pulse" />
            <Trophy className="w-24 h-24 text-accent relative z-10 animate-bounce" />
          </div>
          
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-accent" />
              Subiu de Nível!
              <Sparkles className="w-8 h-8 text-accent" />
            </DialogTitle>
            <DialogDescription className="text-lg">
              Parabéns pela sua dedicação!
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-6">
            <Badge className="bg-gradient-glory text-accent-foreground text-2xl px-6 py-3">
              Nível {level}
            </Badge>
            
            <div className="p-6 bg-gradient-glory/10 rounded-lg border-2 border-accent/20">
              <p className="text-xl font-bold text-foreground mb-2">
                {getLevelName(level)}
              </p>
              <p className="text-muted-foreground">
                {getLevelDescription(level)}
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Star className="w-5 h-5 text-accent" />
              <p className="text-sm">Continue sua jornada espiritual!</p>
              <Star className="w-5 h-5 text-accent" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LevelUpModal;
