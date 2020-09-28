// Interface pour les opérations performer par le formulaire
// pour venir hooker des fonctions custom autour.
export interface FormOps {}

export interface FormStepConfig {
  canPrevious?: boolean;
}

export interface FormStepControlImpl {
  fistPage: boolean;
  lastPage: boolean;
  previous();
  next();
  reset?: () => void;
}
