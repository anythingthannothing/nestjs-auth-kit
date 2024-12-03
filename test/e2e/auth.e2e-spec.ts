import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../src/framework/app.module';
import { authEndPointsConst } from '../../src/framework/auth/lib';

describe('Authentication E2E 테스트', () => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  let app: INestApplication;
  const email = `test${randomNumber}@gmail.com`;
  const password = 'test1234!@';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('정상적인 회원가입 요청 시 201 상태코드를 반환한다.', async () => {
    return request(app.getHttpServer())
      .post(authEndPointsConst.SIGN_UP)
      .send({ email, password })
      .expect(201);
  });

  it('이미 가입된 이메일에 대해 409 상태코드를 반환한다', async () => {
    return request(app.getHttpServer())
      .post(authEndPointsConst.SIGN_UP)
      .send({ email: 'testuseremail@google.com', password })
      .expect(409);
  });

  afterAll(async () => {
    await app.close();
  });
});
