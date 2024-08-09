import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/register';
import { authenticate } from './controllers/authenticate';
import { profile } from '@/http/controllers/profile';
import { verifyJwt } from './middleware/verify-jwt';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, profile);
};
