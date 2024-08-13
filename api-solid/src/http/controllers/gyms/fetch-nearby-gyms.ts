import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case';

export const fetchNearbyGyms = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const searchGymsQuerySchema = z.object({
    userLatitude: z.number().refine((value) => Math.abs(value) <= 90),
    userLongitude: z.number().refine((value) => Math.abs(value) <= 180),
  });

  const { userLatitude, userLongitude } = searchGymsQuerySchema.parse(
    req.query
  );

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude,
    userLongitude,
  });

  return res.status(200).send({ gyms });
};
