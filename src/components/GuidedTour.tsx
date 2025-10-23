import { useEffect, useState } from 'react';
import { useTour, tourSteps } from '@/hooks/useTour';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const GuidedTour = () => {
  const {
    isActive,
    currentStep,
    showWelcome,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    endTour,
    totalSteps,
    currentStepData
  } = useTour();

  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isActive && currentStepData) {
      const element = document.querySelector(currentStepData.target) as HTMLElement;
      if (element) {
        setTargetElement(element);
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          const position = currentStepData.position || 'bottom';
          
          const tooltipWidth = 384; // max-w-sm (24rem)
          const tooltipHeight = 300; // estimativa
          const padding = 20;
          
          let top = 0;
          let left = 0;

          switch (position) {
            case 'bottom':
              top = rect.bottom + padding;
              left = rect.left + rect.width / 2;
              // Ajustar se sair da tela
              if (top + tooltipHeight > window.innerHeight) {
                top = rect.top - tooltipHeight - padding;
              }
              break;
            case 'top':
              top = rect.top - tooltipHeight - padding;
              left = rect.left + rect.width / 2;
              // Ajustar se sair da tela
              if (top < 0) {
                top = rect.bottom + padding;
              }
              break;
            case 'left':
              top = rect.top + rect.height / 2;
              left = rect.left - tooltipWidth - padding;
              // Ajustar se sair da tela
              if (left < 0) {
                left = rect.right + padding;
              }
              break;
            case 'right':
              top = rect.top + rect.height / 2;
              left = rect.right + padding;
              // Ajustar se sair da tela
              if (left + tooltipWidth > window.innerWidth) {
                left = rect.left - tooltipWidth - padding;
              }
              break;
          }

          // Garantir que o tooltip não saia da tela horizontalmente
          if (position === 'top' || position === 'bottom') {
            const halfWidth = tooltipWidth / 2;
            if (left - halfWidth < padding) {
              left = halfWidth + padding;
            } else if (left + halfWidth > window.innerWidth - padding) {
              left = window.innerWidth - halfWidth - padding;
            }
          }

          // Garantir que o tooltip não saia da tela verticalmente
          if (position === 'left' || position === 'right') {
            const halfHeight = tooltipHeight / 2;
            if (top - halfHeight < padding) {
              top = halfHeight + padding;
            } else if (top + halfHeight > window.innerHeight - padding) {
              top = window.innerHeight - halfHeight - padding;
            }
          }

          setTooltipPosition({ top, left });
        }, 300);
      }
    } else {
      setTargetElement(null);
    }
  }, [isActive, currentStep, currentStepData]);

  if (showWelcome) {
    return (
      <Dialog open={showWelcome} onOpenChange={skipTour}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Bem-vindo ao Sistema! 👋</DialogTitle>
            <DialogDescription className="text-base pt-4">
              Gostaria de fazer um tour guiado para conhecer todas as funcionalidades do sistema?
              Você pode cancelar a qualquer momento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={skipTour} className="w-full sm:w-auto">
              Não, obrigado
            </Button>
            <Button onClick={startTour} className="w-full sm:w-auto">
              Sim, iniciar tour
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  if (!isActive || !currentStepData || !targetElement) return null;

  const getArrowStyles = () => {
    const arrowSize = 12;
    const position = currentStepData?.position || 'bottom';
    
    switch (position) {
      case 'bottom':
        return {
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid hsl(var(--card))`,
        };
      case 'top':
        return {
          bottom: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid hsl(var(--card))`,
        };
      case 'left':
        return {
          right: '-12px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid hsl(var(--card))`,
        };
      case 'right':
        return {
          left: '-12px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid hsl(var(--card))`,
        };
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 z-[100] pointer-events-none" />
      
      {/* Highlight com pulse animation */}
      <div
        className="fixed z-[101] pointer-events-none animate-pulse"
        style={{
          top: `${targetElement.getBoundingClientRect().top - 4}px`,
          left: `${targetElement.getBoundingClientRect().left - 4}px`,
          width: `${targetElement.offsetWidth + 8}px`,
          height: `${targetElement.offsetHeight + 8}px`,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 30px 5px rgba(59, 130, 246, 0.8), inset 0 0 20px rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          border: '3px solid rgb(59, 130, 246)',
          transition: 'all 0.3s ease'
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed z-[102] animate-in fade-in duration-300"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
          transform: currentStepData.position === 'top' 
            ? 'translate(-50%, 0)' 
            : currentStepData.position === 'bottom'
            ? 'translate(-50%, 0)'
            : currentStepData.position === 'left'
            ? 'translate(0, -50%)'
            : 'translate(0, -50%)'
        }}
      >
        <div className="bg-card border-2 border-primary shadow-2xl rounded-lg p-6 max-w-sm relative">
          {/* Seta indicadora */}
          <div 
            className="absolute w-0 h-0"
            style={getArrowStyles()}
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={endTour}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="pr-6">
            <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{currentStepData.content}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} de {totalSteps}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              <Button size="sm" onClick={nextStep}>
                {currentStep === totalSteps - 1 ? 'Finalizar' : 'Próximo'}
                {currentStep !== totalSteps - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
