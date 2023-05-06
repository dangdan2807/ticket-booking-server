import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { mappingTranslate } from './../src/utils';

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
  let testCase = 2;

  let accessTokenAdmin = '';
  let accessTokenCustomer = '';
  if (testCase === 1 || testCase === 0) {
    describe('Auth Admin', () => {
      const baseUrl = '/auth/admin';
      const loginUrl = `${baseUrl}/login`;
      const email = 'dangdan2807@gmail.com';
      const email2 = 'superman2@gmail.com';
      const phone = '0389324159';
      const phone2 = '0774588351';
      const password = '123456';
      describe(`Login - POST ${loginUrl}`, () => {
        it('Error email/phone null', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !== mappingTranslate['EMAIL_OR_PHONE_REQUIRED']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error email empty', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email: '',
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !== mappingTranslate['EMAIL_OR_PHONE_REQUIRED']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error email - user not found', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email: email2,
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !==
                mappingTranslate['INVALID_USERNAME_OR_PASSWORD']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error email - not match regex', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email: 'superman2',
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !==
                mappingTranslate['INVALID_USERNAME_OR_PASSWORD']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error phone empty', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone: '',
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !== mappingTranslate['EMAIL_OR_PHONE_REQUIRED']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error phone - user not found', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone: phone2,
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !==
                mappingTranslate['INVALID_USERNAME_OR_PASSWORD']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error phone - not match regex', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone: 'superman2',
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !==
                mappingTranslate['INVALID_USERNAME_OR_PASSWORD']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error password null', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !== mappingTranslate['PASSWORD_IS_REQUIRED']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error password empty', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
              password: '',
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !== mappingTranslate['PASSWORD_IS_REQUIRED']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error password not match', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
              password: password + '1',
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !==
                mappingTranslate['INVALID_USERNAME_OR_PASSWORD']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Success - by email', async () => {
          const response = await request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
              password,
            });
          const result = response.body; // Lưu kết quả trả về vào biến result
          expect(response.status).toBe(200);
          expect(result.data.access_token).toBeDefined(); // Kiểm tra xem access_token có tồn tại hay không
          accessTokenCustomer = result.data.access_token;
        });
        it('Success - by phone', async () => {
          const response = await request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone,
              password,
            });
          const result = response.body; // Lưu kết quả trả về vào biến result
          expect(response.status).toBe(200);
          expect(result.data.access_token).toBeDefined(); // Kiểm tra xem access_token có tồn tại hay không
          accessTokenCustomer = result.data.access_token;
        });
      });
    });
  }
  if (testCase === 2 || testCase === 0) {
    describe('Auth User', () => {
      const baseUrl = '/auth/user';
      const loginUrl = `${baseUrl}/login`;
      const email = 'superman@gmail.com';
      const email2 = 'superman2@gmail.com';
      const phone = '0774588350';
      const phone2 = '0774588351';
      const password = '12345678';
      describe(`Login - POST ${loginUrl}`, () => {
        it('Error email/phone null', async () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !== mappingTranslate['EMAIL_OR_PHONE_REQUIRED']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error email empty', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email: '',
              password,
            })
            .expect(400)
            .expect((res) => {
              if (
                res.body.message !== mappingTranslate['EMAIL_OR_PHONE_REQUIRED']
              ) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error email - user not found', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email: email2,
              password,
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Error email - not match regex', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email: 'superman2',
              password,
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Error phone empty', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone: '',
              password,
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Error phone - user not found', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone: phone2,
              password,
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Error phone - not match regex', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone: 'superman2',
              password,
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Error password null', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Error password empty', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
              password: '',
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Error password not match', () => {
          return request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
              password: password + '1',
            })
            .expect(400);
          // .expect('Hello World!');
        });
        it('Success - by email', async () => {
          const response = await request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              email,
              password,
            });
          const result = response.body; // Lưu kết quả trả về vào biến result
          expect(response.status).toBe(200);
          expect(result.data.access_token).toBeDefined(); // Kiểm tra xem access_token có tồn tại hay không
          accessTokenCustomer = result.data.access_token;
        });
        it('Success - by phone', async () => {
          const response = await request(app.getHttpServer())
            .post(`${loginUrl}`)
            .send({
              phone,
              password,
            });
          const result = response.body; // Lưu kết quả trả về vào biến result
          expect(response.status).toBe(200);
          expect(result.data.access_token).toBeDefined(); // Kiểm tra xem access_token có tồn tại hay không
          accessTokenCustomer = result.data.access_token;
        });
      });
    });
    testCase = 3;
  }
  if (testCase === 3 || testCase === 0) {
    describe('Booking', () => {
      const baseUrl = '/booking';
      const seatCodes = [];
      const seatIds = [];
      const tripDetailCode = '';
      const promotionLineCodes = [];
      let orderCode = '';
      describe(`Booking - POST ${baseUrl}`, () => {
        it('Error Unauthorized', async () => {
          return request(app.getHttpServer())
            .post(`${baseUrl}`)
            .send({
              seatCodes,
              tripDetailCode,
              promotionLineCodes,
            })
            .expect(401)
            .expect((res) => {
              if (res.body.message !== 'Unauthorized') {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error trip detail code null', async () => {
          return request(app.getHttpServer())
            .post(`${baseUrl}`)
            .set('Authorization', `Bearer ${accessTokenCustomer}`)
            .send({
              seatCodes,
              // tripDetailCode: '',
              promotionLineCodes,
            })
            .expect(400)
            .expect((res) => {
              console.log(res.body);
              
              if (res.body.message !== mappingTranslate['TRIP_DETAIL_CODE_REQUIRED']) {
                throw new Error('Invalid response body');
              }
            });
        });
        it('Error trip detail code empty', async () => {
          return request(app.getHttpServer())
            .post(`${baseUrl}`)
            .set('Authorization', `Bearer ${accessTokenCustomer}`)
            .send({
              seatCodes,
              tripDetailCode: '',
              promotionLineCodes,
            })
            .expect(404)
            .expect((res) => {
              if (res.body.message !== mappingTranslate['TRIP_DETAIL_NOT_FOUND']) {
                throw new Error('Invalid response body');
              }
            });
        });
      });

      // const getZaloPayUrl = `${baseUrl}/zalopay-payment-url/${orderCode}`
      // describe(`Get ZaloPay payment url - GET ${getZaloPayUrl}`, () => {
      // });
    });
  }
});
