import { FastifyInstance } from 'fastify';
import { register } from '@/http/controllers/users/register';
import { authenticate } from './authenticate';
import { getProfile } from '@/http/controllers/users/get-profile';
import { verifyJwt } from '@/http/middleware/verify-jwt';
import { getMetrics } from './get-metrics';

export const usersRoutes = async (app: FastifyInstance) => {
  app.post('/users', register);
  app.post('/sessions', authenticate);

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, getProfile);
  app.get('/metrics', { onRequest: [verifyJwt] }, getMetrics);
};
