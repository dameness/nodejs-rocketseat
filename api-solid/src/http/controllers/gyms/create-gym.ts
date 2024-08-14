import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';

export const createGym = async (req: FastifyRequest, res: FastifyReply) => {
  const createGymBodySchema = z.object({
    title: z.string(),
    description: z.optional(z.string()),
    phone: z.optional(z.string()),
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { title, description, phone, latitude, longitude } =
    createGymBodySchema.parse(req.body);

  const createGymUseCase = makeCreateGymUseCase();

  await createGymUseCase.execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  });

  return res.status(201).send();
};
