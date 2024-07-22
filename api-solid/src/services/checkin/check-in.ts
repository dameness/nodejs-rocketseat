import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { CheckInsRepository } from '@/models/check-ins-repository';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    {
      // recebendo user_id e gym_id pois é do tipo UncheckedCreateInput
      // que não tem intenção de passar uma instância como parâmetro, que
      // seria, por exemplo, criar um User e um Gym NA HORA DA criação
      // de um CheckIn e associá-los.
      const checkIn = await this.checkInRepository.create({
        user_id: userId,
        gym_id: gymId,
      });

      if (!checkIn) {
        throw new ResourceNotFoundError();
      }

      return { checkIn };
    }
  }
}
