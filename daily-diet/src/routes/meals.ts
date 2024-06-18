import { FastifyInstance } from 'fastify';

export async function MealsRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {});
  app.get('/', async (req, res) => {});
  app.get('/:id', async (req, res) => {});
  app.get('/summary/:userId', async (req, res) => {});
  app.put('/:id', async (req, res) => {});
  app.delete('/:id', async (req, res) => {});
}
