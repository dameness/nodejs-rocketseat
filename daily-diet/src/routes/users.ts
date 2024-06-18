import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { knex } from '../database';
import { randomUUID } from 'node:crypto';

export async function UsersRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    });

    const { name, email } = createUserBodySchema.parse(req.body);

    await knex('users').insert({ id: randomUUID(), name, email });

    return res.status(201).send();
  });
}
