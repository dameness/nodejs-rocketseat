import { describe, afterAll, beforeAll, beforeEach, it, expect } from 'vitest';
import { app } from '../src/app';
import { execSync } from 'node:child_process';
import request from 'supertest';

describe('meals routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all');
    execSync('npm run knex migrate:latest');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a meal', async () => {
    const userResponse = await request(app.server)
      .post('/users')
      .send({ name: 'name', email: 'mail@mail.com' })
      .expect(201);

    const cookies = userResponse.get('Set-Cookie');

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies!)
      .send({
        name: 'test-meal',
        isOnDiet: true,
        time: '2022/02/01',
      })
      .expect(201);
  });
  // it('should be able get all meals of a user', async () => {});
  // it('should be able to get one meal', async () => {});
  // it('should be able to get a user diet summary', async () => {});
  // it('should be able to edit a meal', async () => {});
  // it('should be able to delete a meal', async () => {});
});
