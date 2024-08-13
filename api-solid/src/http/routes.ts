import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/users/register';
import { authenticate } from './controllers/users/authenticate';
import { profile } from '@/http/controllers/users/profile';
import { verifyJwt } from './middleware/verify-jwt';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, profile);
};
