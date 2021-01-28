import { User } from '../../auth/model/user';

export interface Organisation {
  id?: string;
  managerId?: string;
  name?: string;
  thumbnailURL?: string;
  bannerURL?: string;
  type?: string;
  extraFields?: { [id: string]: any };

  manager?: User;
}

export class OrganisationInvitation {
  id?: number;
  organisationId?: string;
  userId?: string;

  organisation?: Organisation;
  user?: User;

  response?: string;
}

export function getOrganisationOfType(type: string, orgs: Organisation[]) {
  return orgs.filter((x) => x.type === type);
}
