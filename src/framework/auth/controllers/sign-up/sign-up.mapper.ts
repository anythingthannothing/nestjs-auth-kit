import { SignUpServiceInput } from '../../../../core';
import { ISignUpReqDto } from './sign-up.req.dto';

export const signUpMapper = {
  mapToSignUpServiceInput: (dto: ISignUpReqDto) => {
    return new SignUpServiceInput(dto.email, dto.password);
  },
  mapToSignUpReqDto: (dto: any) => {
    return {};
  },
};
