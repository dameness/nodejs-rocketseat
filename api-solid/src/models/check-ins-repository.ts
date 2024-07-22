import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInsRepository {
  // UncheckedCreateInput --> ver anotação no use case
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
}
