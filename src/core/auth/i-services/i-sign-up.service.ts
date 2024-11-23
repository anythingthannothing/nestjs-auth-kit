import { UserDomain } from '../../domain';
import { CreateAccountRepositoryInput } from '../i-repositories';

export class SignUpServiceInput {
  constructor(
    readonly email: string,
    readonly password: string,
  ) {}

  public mapToCreateAccountRepositoryInput(
    hashedPassword: string,
  ): CreateAccountRepositoryInput {
    return new CreateAccountRepositoryInput(this.email, hashedPassword);
  }
}

export interface ISignUpService {
  execute(dto: SignUpServiceInput): Promise<UserDomain>;
}
