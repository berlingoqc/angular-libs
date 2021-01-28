import { Organisation } from '../../organisation/model/organisation';


export interface UserCredentials {
  id?: string;
  activationCode?: string;
  passwordResetCode?: string;
  userId?: string;
}

export interface User {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  blocked?: boolean;
  validUntil?: number;
  userCredentials?: UserCredentials;
  roles?: {
    role: string;
  }[];
  extraFields?: { [id: string]: any };
}

export interface ExtraField {
  id: number;
  type: string;
  name: string;
  editable: boolean;
  defaultValue?: any;
  required: boolean;
  validators: any;
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface UserProfile {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  firstname: string;
  lastname: string;
  roles?: string[];
  organisations?: Organisation[];
}

export interface NewUserRequest extends User {
  password: string;
}

export interface Credentials {
  email: string;
  password: string;
}
