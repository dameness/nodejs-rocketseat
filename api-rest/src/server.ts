import fastify from 'fastify';
import { transactionsRoutes } from './routes/transactions';
import { fastifyCookie } from '@fastify/cookie';

const app = fastify();

// register -> fastify "plugins"
// cookies should be registered before transactions to use them in transactions
app.register(fastifyCookie);

app.register(transactionsRoutes, {
  prefix: 'transactions',
});

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running!');
});
