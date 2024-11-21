import { ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { tokenEnv } from '../../../app-config/envs';
import { SignUpController } from './sign-up.controller';

describe('SignUpController', () => {
  let signUpController: SignUpController;
  let tokenConfigMock: ConfigType<typeof tokenEnv>;

  beforeAll(async () => {
    tokenConfigMock = { jwtExpiresInSeconds: 3600 } as ConfigType<
      typeof tokenEnv
    >;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [{ provide: tokenEnv.KEY, useValue: tokenConfigMock }],
    }).compile();

    signUpController = module.get<SignUpController>(SignUpController);
  });

  it('should be defined', () => {
    expect(signUpController).toBeDefined();
  });
});
