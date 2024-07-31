import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  // UncheckedCreateInput --> ver anotação no use case
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId({
    userId,
    page,
  }: {
    userId: string;
    page: number;
  }): Promise<CheckIn[]>;
  countByUserId(userId: string): number;
}
