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
  it('should be able get all meals of a user', async () => {
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

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies!)
      .send({
        name: 'test-meal-2',
        isOnDiet: true,
        time: '2022/02/01',
      })
      .expect(201);

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200);

    expect(mealsResponse.body.meals).toHaveLength(2);

    expect(mealsResponse.body.meals[0]).toEqual(
      expect.objectContaining({ name: 'test-meal' })
    );

    expect(mealsResponse.body.meals[1]).toEqual(
      expect.objectContaining({ name: 'test-meal-2' })
    );
  });
  it('should be able to get one meal', async () => {
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

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200);

    const { id } = mealsResponse.body.meals[0];

    const singleMealResponse = await request(app.server)
      .get(`/meals/${id}`)
      .set('Cookie', cookies!)
      .expect(200);

    expect(singleMealResponse.body.meal).toEqual(
      expect.objectContaining({
        id,
        name: 'test-meal',
      })
    );
  });
  it('should be able to get a user diet summary', async () => {
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
        isOnDiet: false,
        time: '2022/02/01',
      })
      .expect(201);

    await request(app.server)
      .post('/meals')
      .set('Cookie', cookies!)
      .send({
        name: 'test-meal-2',
        isOnDiet: true,
        time: '2022/02/01',
      })
      .expect(201);

    const summaryResponse = await request(app.server)
      .get('/meals/summary')
      .set('Cookie', cookies!)
      .expect(200);

    expect(summaryResponse.body).toEqual({
      total: 2,
      onDiet: 1,
      offDiet: 1,
      bestStreakOnDiet: 1,
    });
  });
  it('should be able to edit a meal', async () => {
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

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200);

    const { id, time: initialTime } = mealsResponse.body.meals[0];

    await request(app.server)
      .put(`/meals/${id}`)
      .send({
        name: 'test-meal-2',
        isOnDiet: false,
      })
      .set('Cookie', cookies!)
      .expect(204);

    const singleMealResponse = await request(app.server)
      .get(`/meals/${id}`)
      .set('Cookie', cookies!)
      .expect(200);

    expect(singleMealResponse.body.meal).toEqual(
      expect.objectContaining({
        id,
        name: 'test-meal-2',
        isOnDiet: 0,
        time: initialTime,
      })
    );
  });
  it('should be able to delete a meal', async () => {
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

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200);

    const { id } = mealsResponse.body.meals[0];

    await request(app.server)
      .delete(`/meals/${id}`)
      .set('Cookie', cookies!)
      .expect(204);

    const singleMealResponse = await request(app.server)
      .get(`/meals/${id}`)
      .set('Cookie', cookies!)
      .expect(404);
  });
});
