import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export const getProfile = async (req: FastifyRequest, res: FastifyReply) => {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: req.user.sub,
  });

  return res.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
};
