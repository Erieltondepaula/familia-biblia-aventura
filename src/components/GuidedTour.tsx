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
          
          let top = 0;
          let left = 0;

          switch (position) {
            case 'bottom':
              top = rect.bottom + window.scrollY + 20;
              left = rect.left + window.scrollX + rect.width / 2;
              break;
            case 'top':
              top = rect.top + window.scrollY - 20;
              left = rect.left + window.scrollX + rect.width / 2;
              break;
            case 'left':
              top = rect.top + window.scrollY + rect.height / 2;
              left = rect.left + window.scrollX - 20;
              break;
            case 'right':
              top = rect.top + window.scrollY + rect.height / 2;
              left = rect.right + window.scrollX + 20;
              break;
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

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-[100] pointer-events-none" />
      
      {/* Highlight */}
      <div
        className="fixed z-[101] pointer-events-none"
        style={{
          top: `${targetElement.getBoundingClientRect().top}px`,
          left: `${targetElement.getBoundingClientRect().left}px`,
          width: `${targetElement.offsetWidth}px`,
          height: `${targetElement.offsetHeight}px`,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
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
            ? 'translate(-50%, -100%)' 
            : currentStepData.position === 'bottom'
            ? 'translate(-50%, 0)'
            : currentStepData.position === 'left'
            ? 'translate(-100%, -50%)'
            : 'translate(0, -50%)'
        }}
      >
        <div className="bg-card border shadow-lg rounded-lg p-6 max-w-sm relative">
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
