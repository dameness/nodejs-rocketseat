import { Prisma, User } from '@prisma/client';

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
