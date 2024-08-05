import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  // UncheckedCreateInput --> ver anotação no use case
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  findById(id: string): Promise<CheckIn | null>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(params: {
    userId: string;
    page: number;
  }): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
}
