import { validate } from 'typia';

import { IGoogleLoginReqDto } from './i-google-login.req.dto';

const baseDto = {
  googleId: '1234567890',
  email: 'test.user@example.com',
  picture: 'https://example.com/user.jpg',
};

describe('IGoogleLoginReqDto Validation', () => {
  it('should validate a correct IGoogleLoginReqDto object', () => {
    const validDto: IGoogleLoginReqDto = {
      ...baseDto,
      givenName: 'John',
      familyName: 'Doe',
    };

    const validationResult = validate<IGoogleLoginReqDto>(validDto);

    expect(validationResult.success).toBe(true);
  });

  it('should invalidate an object with invalid googleId', () => {
    const invalidDto = {
      ...baseDto,
      googleId: '',
    };

    const validationResult = validate<IGoogleLoginReqDto>(invalidDto);

    expect(validationResult.success).toBe(false);
    expect(validationResult.errors.length).toEqual(1);
  });

  it('should invalidate an object with invalid email format', () => {
    const invalidDto = {
      ...baseDto,
      email: 'invalidemailformat@google',
    };

    const validationResult = validate<IGoogleLoginReqDto>(invalidDto);

    expect(validationResult.success).toBe(false);
    expect(validationResult.errors.length).toEqual(1);
  });

  it('should invalidate an object with missing required fields', () => {
    const invalidDto = {
      email: 'test.user@example.com',
      picture: 'https://example.com/user.jpg',
    };

    const validationResult = validate<IGoogleLoginReqDto>(invalidDto);

    expect(validationResult.success).toBe(false);
    expect(validationResult.errors.length).toEqual(1);
  });

  it('should validate an object with optional fields omitted', () => {
    const validDto: IGoogleLoginReqDto = {
      googleId: '1234567890',
      email: 'test.user@example.com',
      picture: 'https://example.com/user.jpg',
    };

    const validationResult = validate<IGoogleLoginReqDto>(validDto);

    expect(validationResult.success).toBe(true);
  });
});
