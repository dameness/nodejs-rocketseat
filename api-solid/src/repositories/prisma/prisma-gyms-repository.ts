import { prisma } from '@/lib/prisma';
import { GymsRepository, findManyNearbyParams } from '@/models/gyms-repository';
import { Gym, Prisma } from '@prisma/client';

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    });

    return gym;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: { id },
    });

    return gym;
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    return gyms;
  }

  async search({ query, page }: { query: string; page: number }) {
    const gyms = await prisma.gym.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return gyms;
  }
}
