import { AuthenticateUseCase } from '@/use-cases/authenticate/authenticate';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository(); // inversão de dependências!
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
