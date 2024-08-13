import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';

export const getMetrics = async (req: FastifyRequest, res: FastifyReply) => {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { totalCheckIns } = await getUserMetricsUseCase.execute({
    userId: req.user.sub,
  });

  return res.status(200).send({ totalCheckIns });
};
