import { RegisterUseCase } from '@/use-cases/users/register';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository(); // inversão de dependências!
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
}
