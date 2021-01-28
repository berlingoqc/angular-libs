
export interface AuthFactor {
  icon: string;
  mode: string;
}
export class PasswordResetRequest {
  email: string;
  factor: string;
  data?: string;
}

export class PasswordResetConfirmationRequest {
  otp: string;
  new: string;
  email: string;
}


export class AcceptedInvitation {
  email: string;
  otp: string;
  password: string;
}
