import { z } from 'zod';

import { FastifyReply, FastifyRequest } from 'fastify';
import { registerUseCase } from '@/services/users/register';

export const register = async (req: FastifyRequest, res: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  try {
    await registerUseCase({ name, email, password });
  } catch (err) {
    return res.status(409).send();
  }

  return res.status(201).send();
};