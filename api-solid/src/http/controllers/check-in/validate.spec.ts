import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Validate Check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to validate check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const { id: userId } = await prisma.user.findFirstOrThrow();

    const { id: gymId } = await prisma.gym.create({
      data: {
        title: 'gym-01',
        latitude: 90,
        longitude: 180,
      },
    });

    let checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gymId,
        user_id: userId,
      },
    });

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);

    checkIn = await prisma.checkIn.findUniqueOrThrow({
      where: { id: checkIn.id },
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
  });
});
