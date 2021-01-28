import { PasswordConfig } from '@berlingoqc/ngx-common';
import { ExtraField } from '../../auth';

export class SSOSettings {
  publicCreation = true; // Allow the creation of account publicly
  multiFactor = true; // Allow of multifactor authorization
  accountValidation = true; // Send email or sms for account validation
  defaultRoles = [];
}


export class SSOFullSettings {
  sso: SSOSettings;
  email: {
    type: string;
    host: string;
    secure: boolean;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
  emailFrom: string;
  emailRedirect: string;
  tokenExpiresIn: string;
  password: PasswordConfig;
  userExtraFields: ExtraField[];
}

