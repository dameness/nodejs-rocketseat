import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verify-jwt';
import { createGym } from './create-gym';
import { searchGyms } from './search-gyms';
import { fetchNearbyGyms } from './fetch-nearby-gyms';
import { verifyUserRole } from '@/http/middleware/verify-user-role';

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, createGym);

  app.get('/gyms/search', searchGyms);
  app.get('/gyms/nearby', fetchNearbyGyms);
};
