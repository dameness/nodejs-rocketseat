import fastify from 'fastify';
import { MealsRoutes } from './routes/meals';
import { UsersRoutes } from './routes/users';

export const app = fastify();

app.register(UsersRoutes, { prefix: 'users' });
app.register(MealsRoutes, { prefix: 'meals' });
