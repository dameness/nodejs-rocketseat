import { FetchUserCheckInHistoryUseCase } from '../check-in/fetch-user-check-in-history';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';

export function makeFetchUserCheckInHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInHistoryUseCase(checkInsRepository);

  return useCase;
}
