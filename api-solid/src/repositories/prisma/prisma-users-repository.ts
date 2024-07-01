import { prisma } from '@/lib/prisma';
import { UsersRepository } from '@/models/users-repository';
import { Prisma } from '@prisma/client';
export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
}
