import { FastifyInstance } from 'fastify';

export async function MealsRoutes(app: FastifyInstance) {
  app.get('/', async (req, res) => {
    res.send('hello');
  });
}
