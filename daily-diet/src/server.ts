import { app } from './app';

app.listen({ port: 8080 }).then(() => {
  console.log('Daily Diet HTTP server running');
});
