import { ConfigType } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ISignUpService } from 'src/core';

import { tokenEnv } from '../../../app-config/envs';
import { SignUpService } from '../../services/sign-up.service';
import { SignUpController } from './sign-up.controller';

describe('SignUpController', () => {
  let signUpController: SignUpController;
  let tokenConfigMock: ConfigType<typeof tokenEnv>;
  let signUpServiceMock: ISignUpService;

  beforeAll(async () => {
    tokenConfigMock = { jwtExpiresInSeconds: 3600 } as ConfigType<
      typeof tokenEnv
    >;
    signUpServiceMock = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignUpController],
      providers: [
        { provide: tokenEnv.KEY, useValue: tokenConfigMock },
        { provide: SignUpService, useValue: signUpServiceMock },
      ],
    }).compile();

    signUpController = module.get<SignUpController>(SignUpController);
    signUpServiceMock = module.get<SignUpService>(SignUpService);
    tokenConfigMock = module.get<ConfigType<typeof tokenEnv>>(tokenEnv.KEY);
  });

  it('should be defined', () => {
    expect(signUpController).toBeDefined();
  });
});
