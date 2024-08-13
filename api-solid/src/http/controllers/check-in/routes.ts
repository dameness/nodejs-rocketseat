import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verify-jwt';
import { checkIn } from './check-in';
import { validateCheckIn } from './validate-check-in';
import { fetchUserCheckInHistory } from './fetch-user-check-in-history';

export const checkInRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt);

  app.post('/gyms/:gymId/check-ins', checkIn);

  app.get('/check-ins/history', fetchUserCheckInHistory);

  app.patch('/check-ins/:checkInId/validate', validateCheckIn);
};
