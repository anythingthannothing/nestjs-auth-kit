import { createAssert } from 'typia';

import { ISignUpReqDto } from './i-sign-up.req.dto';

describe('SignUpReqDto Validation', () => {
  const assert = createAssert<ISignUpReqDto>();

  it('should pass validation for valid email and password', () => {
    const validData: ISignUpReqDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    expect(() => assert(validData)).not.toThrow();
  });

  it('should fail validation for invalid email', () => {
    const invalidEmailData: ISignUpReqDto = {
      email: 'invalid_email',
      password: 'password123',
    };

    expect(() => assert(invalidEmailData)).toThrow();
  });

  it('should fail validation for email that is too short', () => {
    const shortEmailData: ISignUpReqDto = {
      email: 'a@b.c',
      password: 'password123',
    };

    expect(() => assert(shortEmailData)).toThrow();
  });

  it('should fail validation for email that is too long', () => {
    const longEmailData: ISignUpReqDto = {
      email: 'a'.repeat(300) + '@example.com',
      password: 'password123',
    };

    expect(() => assert(longEmailData)).toThrow();
  });

  it('should fail validation for password that is too short', () => {
    const shortPasswordData: ISignUpReqDto = {
      email: 'test@example.com',
      password: 'short',
    };

    expect(() => assert(shortPasswordData)).toThrow();
  });

  it('should fail validation for password that is too long', () => {
    const longPasswordData: ISignUpReqDto = {
      email: 'test@example.com',
      password: 'a'.repeat(65),
    };

    expect(() => assert(longPasswordData)).toThrow();
  });
});
