import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Fetch User Check-in History (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to fetch user check-in history', async () => {
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
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({ gym_id: gymId, user_id: userId }),
      expect.objectContaining({ gym_id: gymId, user_id: userId }),
    ]);
  });
});
