import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { GetProfileUseCase } from '../users/get-profile';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetProfileUseCase(usersRepository);

  return useCase;
}
