import { UserDomain } from '../user';

export interface AccountDomain {
  accountId: number;
  userId: number;
  user: UserDomain;
  email: string;
  deletedAt?: Date;
}
