import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { checkSessionIdExists } from '../middleware/check-session-id-exists';
import { knex } from '../database';
import { randomUUID } from 'node:crypto';

export async function MealsRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.optional(z.string()),
      isOnDiet: z.boolean(),
      time: z.coerce.date(),
    });

    const { name, description, isOnDiet, time } = createMealBodySchema.parse(
      req.body
    );

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      isOnDiet,
      time, //ARRUMAR
    });

    return res.status(201).send();
  });
  app.get('/', async (req, res) => {});
  app.get('/:id', async (req, res) => {});
  app.get('/summary/:userId', async (req, res) => {});
  app.put('/:id', async (req, res) => {});
  app.delete('/:id', async (req, res) => {});
}
