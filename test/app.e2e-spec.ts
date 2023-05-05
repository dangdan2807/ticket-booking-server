import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth Admin', () => {
    const baseUrl = '/auth/admin';
    const loginUrl = `${baseUrl}/login`;
    let accessToken = '';
    describe(`Login - POST ${loginUrl}`, () => {
      it('Error Unauthorized', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            email: 'dangdan2807+1@gmail.com',
            password: '123456',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error email null', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            password: '123456',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error email empty', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            email: '',
            password: '123456',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error email - user not found', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            email: 'dangdan28070001@gmail.com',
            password: '123456',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error phone null', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            password: '123456',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error phone empty', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            phone: '',
            password: '123456',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error phone - user not found', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            phone: '0389324158',
            password: '123456',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error password null', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            email: 'dangdan2807@gmail.com',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error password empty', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            email: 'dangdan2807@gmail.com',
            password: '',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Error password not match', () => {
        return request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            email: 'dangdan2807@gmail.com',
            password: '12345678',
          })
          .expect(400);
        // .expect('Hello World!');
      });
      it('Success', async () => {
        const response = await request(app.getHttpServer())
          .post(`${loginUrl}`)
          .send({
            email: 'dangdan2807@gmail.com',
            password: '123456',
          });
        const result = response.body; // Lưu kết quả trả về vào biến result
        expect(response.status).toBe(200);
        expect(result.data.access_token).toBeDefined(); // Kiểm tra xem access_token có tồn tại hay không
        accessToken = result.data.access_token;
      });
    });

    const register = `${baseUrl}/register`;
    describe(`Register - POST ${register}`, () => {
    });
  });
});
