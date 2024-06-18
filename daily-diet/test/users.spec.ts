import { afterAll, beforeAll, describe, beforeEach, it } from 'vitest';
import { app } from '../src/app';
import { execSync } from 'node:child_process';
import request from 'supertest';

describe('users routes', () => {
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

  it('should be able to create a user', async () => {
    await request(app.server)
      .post('/users')
      .send({ name: 'name', email: 'mail@mail.com' })
      .expect(201);
  });
});
