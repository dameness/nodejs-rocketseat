import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/models/check-ins-repository';

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  totalCheckIns: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const totalCheckIns = this.checkInRepository.countByUserId(userId);

    return { totalCheckIns };
  }
}
