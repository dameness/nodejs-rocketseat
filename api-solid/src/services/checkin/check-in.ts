import { CheckIn } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { CheckInsRepository } from '@/models/check-ins-repository';
import { GymsRepository } from '@/models/gyms-repository';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    {
      const gym = await this.gymsRepository.findById(gymId);

      if (!gym) {
        throw new ResourceNotFoundError();
      }

      // calculate distance between user and gym

      const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
        userId,
        new Date()
      );

      if (checkInOnSameDate) {
        throw new Error();
      }

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
