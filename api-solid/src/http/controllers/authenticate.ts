import { z } from 'zod';

import { FastifyReply, FastifyRequest } from 'fastify';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/services/factories/make-authenticate-use-case';

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError)
      return res.status(400).send({ message: err.message });

    throw err;
  }

  return res.status(200).send();
};
