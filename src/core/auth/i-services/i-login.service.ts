import { UserDomain } from '../../domain';

export class LoginServiceInput {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export interface ILoginService {
  execute(dto: LoginServiceInput): Promise<UserDomain>;
}
