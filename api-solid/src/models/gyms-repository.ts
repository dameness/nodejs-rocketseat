import { Prisma, Gym } from '@prisma/client';

export interface GymsRepository {
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  search({ query, page }: { query: string; page: number }): Promise<Gym[]>;
}
