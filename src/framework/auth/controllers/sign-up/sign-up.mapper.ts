import { SignUpServiceInput } from '../../../../core';
import { ISignUpReqDto } from './i-sign-up.req.dto';

export const signUpMapper = {
  mapToSignUpServiceInput: (dto: ISignUpReqDto) => {
    return new SignUpServiceInput(dto.email, dto.password);
  },
  mapToSignUpReqDto: (dto: any) => {
    return {};
  },
};
