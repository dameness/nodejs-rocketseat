import fastify from 'fastify';
import { usersRoutes } from './http/controllers/users/routes';
import { gymsRoutes } from './http/controllers/gyms/routes';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import { checkInRoutes } from './http/controllers/check-in/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInRoutes);

app.setErrorHandler((error, _req, res) => {
  if (error instanceof ZodError)
    return res
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // aqui deveria ser usada uma ferramenta externa para os logs de erro ex. DataDog/NewRelic/Sentry
  }

  return res.status(500).send({ message: 'Internal server error.' });
});
