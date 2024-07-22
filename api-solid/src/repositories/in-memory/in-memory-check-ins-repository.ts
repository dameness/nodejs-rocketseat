import { CheckInsRepository } from '@/models/check-ins-repository';
import { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

//fake database in memory to use in unit tests
export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.items.push(checkIn);

    return checkIn;
  }
}
