import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { makeFetchUserCheckInHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case';

export const fetchUserCheckInHistory = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(req.query);

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInHistoryUseCase();

  const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
    userId: req.user.sub,
    page,
  });

  return res.status(200).send({ checkIns });
};
