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
      time: time.getTime().toString(),
      user_id: req.user?.id,
    });

    return res.status(201).send();
  });
  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const meals = await knex('meals').where({ user_id: req.user?.id });
    return { meals };
  });
  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const getMealByIdSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getMealByIdSchema.parse(req.params);

    const meal = await knex('meals')
      .where({ id, user_id: req.user?.id })
      .first();

    if (!meal) {
      return res.status(404).send({ error: 'Not Found.' });
    }

    return { meal };
  });
  app.get(
    '/summary/:userId',
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {}
  );
  app.put('/:id', { preHandler: [checkSessionIdExists] }, async (req, res) => {
    const editMealBodySchema = z.object({
      name: z.optional(z.string()),
      description: z.optional(z.string()),
      isOnDiet: z.optional(z.boolean()),
      time: z.optional(z.coerce.date()),
    });

    const { name, description, isOnDiet, time } = editMealBodySchema.parse(
      req.body
    );
    const getMealByIdSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getMealByIdSchema.parse(req.params);

    const meal = await knex('meals')
      .where({ id, user_id: req.user?.id })
      .first();

    if (!meal) {
      return res.status(404).send({ error: 'Not Found.' });
    }

    await knex('meals')
      .update({ name, description, isOnDiet, time: time?.getTime().toString() })
      .where({ id, user_id: req.user?.id });

    return res.status(204).send();
  });
  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, res) => {
      const getMealByIdSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getMealByIdSchema.parse(req.params);

      const meal = await knex('meals')
        .where({ id, user_id: req.user?.id })
        .first();

      if (!meal) {
        return res.status(404).send({ error: 'Not Found.' });
      }
      // FINALIZAR
    }
  );
}
