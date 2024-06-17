import fastify from 'fastify';
import { MealsRoutes } from './routes/meals';

export const app = fastify();

app.register(MealsRoutes, { prefix: 'meals' });
