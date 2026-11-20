import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/health (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/health').expect(200);
    expect(res.body.status).toBe('ok');
  });

  it('/users (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/users').expect(200);
    expect(res.body).toHaveLength(3);
  });

  it('/users/1 (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/users/1').expect(200);
    expect(res.body.name).toBe('Alice Johnson');
  });

  it('/users/999 (GET) returns 404', () => {
    return request(app.getHttpServer()).get('/users/999').expect(404);
  });

  it('/products (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/products').expect(200);
    expect(res.body).toHaveLength(3);
  });

  afterEach(async () => {
    await app.close();
  });
});
