import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Get Metrics(e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get metrics', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { id: userId } = await prisma.user.findFirstOrThrow();

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'gym-01',
        latitude: 90,
        longitude: 180,
      },
    });

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gymId,
          user_id: userId,
        },
        {
          gym_id: gymId,
          user_id: userId,
        },
      ],
    });

    const response = await request(app.server)
      .get('/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.totalCheckIns).toEqual(2);
  });
});
