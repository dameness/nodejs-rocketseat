import { FastifyReply, FastifyRequest } from 'fastify';
import { knex } from '../database';

export const checkSessionIdExists = async (
  req: FastifyRequest & {
    user?: {
      id: string;
      name: string;
      email: string;
      session_id?: string;
    };
  },
  res: FastifyReply
) => {
  const { sessionId } = req.cookies;
  if (!sessionId) {
    return res.status(401).send({ error: 'Unauthorized.' });
  }

  const user = await knex('users').where({ session_id: sessionId }).first();

  if (!user) {
    return res.status(401).send({ error: 'Unauthorized.' });
  }

  req.user = user;
};
