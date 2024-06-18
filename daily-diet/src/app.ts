import fastify from 'fastify';
import { MealsRoutes } from './routes/meals';
import { UsersRoutes } from './routes/users';
import fastifyCookie from '@fastify/cookie';

export const app = fastify();

app.register(fastifyCookie);
app.register(UsersRoutes, { prefix: 'users' });
app.register(MealsRoutes, { prefix: 'meals' });
