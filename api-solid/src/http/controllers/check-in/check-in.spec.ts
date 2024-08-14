import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'gym-01',
        latitude: 90,
        longitude: 180,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gymId}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: 90,
        userLongitude: 180,
      });

    expect(response.statusCode).toEqual(201);
  });
});
