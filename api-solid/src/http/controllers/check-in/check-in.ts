import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';

export const checkIn = async (req: FastifyRequest, res: FastifyReply) => {
  const checkInBodySchema = z.object({
    userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
    userLongitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });

  const { userLatitude, userLongitude } = checkInBodySchema.parse(req.body);

  const { gymId } = checkInParamsSchema.parse(req.params);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    userId: req.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  });

  return res.status(201).send();
};
