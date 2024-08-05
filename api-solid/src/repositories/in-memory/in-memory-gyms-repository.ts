import { GymsRepository, findManyNearbyParams } from '@/models/gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);
    return gym || null;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude,
          longitude,
        },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        }
      );

      return distance < 10;
    });
  }

  async search({ query, page }: { query: string; page: number }) {
    const gyms = this.items
      .filter(
        (item) =>
          item.title.includes(query) || item.description?.includes(query)
      )
      .slice((page - 1) * 20, page * 20);
    return gyms;
  }
}
