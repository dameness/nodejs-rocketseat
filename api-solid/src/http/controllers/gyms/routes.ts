import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middleware/verify-jwt';
import { createGym } from './create-gym';
import { searchGyms } from './search-gyms';
import { fetchNearbyGyms } from './fetch-nearby-gyms';

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt);

  app.post('/gyms', createGym);

  app.get('/gyms/search', searchGyms);
  app.get('/gyms/nearby', fetchNearbyGyms);
};
