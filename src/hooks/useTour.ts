import { useState, useEffect } from 'react';
import { useProfile } from '@/contexts/useProfile';

export interface TourStep {
  target: string;
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const tourSteps: TourStep[] = [
  {
    target: '[data-tour="dashboard"]',
    title: 'Dashboard',
    content: 'Aqui você visualiza seu progresso geral, estatísticas de leitura e conquistas recentes.',
    position: 'bottom'
  },
  {
    target: '[data-tour="reading-plan"]',
    title: 'Plano de Leitura',
    content: 'Acesse o Plano de Leitura M\'Cheyne para acompanhar suas leituras diárias da Bíblia.',
    position: 'bottom'
  },
  {
    target: '[data-tour="devotional"]',
    title: 'Devocionais',
    content: 'Leia devocionais diários com reflexões para manhã e noite, além de perguntas para meditação.',
    position: 'bottom'
  },
  {
    target: '[data-tour="quiz"]',
    title: 'Quiz Bíblico',
    content: 'Teste seus conhecimentos bíblicos com quizzes interativos e aprenda mais sobre as Escrituras.',
    position: 'bottom'
  },
  {
    target: '[data-tour="reflections"]',
    title: 'Reflexões',
    content: 'Escreva e salve suas reflexões pessoais sobre as leituras e estudos bíblicos.',
    position: 'bottom'
  },
  {
    target: '[data-tour="achievements"]',
    title: 'Conquistas',
    content: 'Acompanhe suas conquistas e badges conforme você progride em sua jornada de leitura.',
    position: 'bottom'
  },
  {
    target: '[data-tour="profiles"]',
    title: 'Perfis',
    content: 'Gerencie múltiplos perfis de leitura para diferentes membros da família.',
    position: 'bottom'
  },
  {
    target: '[data-tour="settings"]',
    title: 'Configurações',
    content: 'Personalize sua experiência ajustando preferências, tema e outras configurações.',
    position: 'bottom'
  }
];

export const useTour = () => {
  const { currentProfile } = useProfile();
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (currentProfile?.id) {
      const tourKey = `hasSeenTour_${currentProfile.id}`;
      const hasSeenTour = localStorage.getItem(tourKey);
      if (!hasSeenTour) {
        setShowWelcome(true);
      }
    }
  }, [currentProfile?.id]);

  const startTour = () => {
    if (currentProfile?.id) {
      setShowWelcome(false);
      setIsActive(true);
      setCurrentStep(0);
      const tourKey = `hasSeenTour_${currentProfile.id}`;
      localStorage.setItem(tourKey, 'true');
    }
  };

  const skipTour = () => {
    if (currentProfile?.id) {
      setShowWelcome(false);
      const tourKey = `hasSeenTour_${currentProfile.id}`;
      localStorage.setItem(tourKey, 'true');
    }
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const endTour = () => {
    setIsActive(false);
    setCurrentStep(0);
  };

  return {
    isActive,
    currentStep,
    showWelcome,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    endTour,
    totalSteps: tourSteps.length,
    currentStepData: tourSteps[currentStep]
  };
};
