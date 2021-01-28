export interface DepRessource {
  [dep: string]: string;
}
export class ContactConfig {
  telephone: DepRessource;
  email: DepRessource;
}
