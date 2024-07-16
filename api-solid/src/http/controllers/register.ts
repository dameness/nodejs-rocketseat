import { z } from 'zod';

import { FastifyReply, FastifyRequest } from 'fastify';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error';
import { makeRegisterUseCase } from '@/services/factories/make-register-use-case';

export const register = async (req: FastifyRequest, res: FastifyReply) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(req.body);

  const registerUseCase = makeRegisterUseCase();

  try {
    await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      return res.status(409).send({ message: err.message });

    throw err;
  }

  return res.status(201).send();
};
