import { describe, expect, it } from 'vitest';
import { beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();

    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'test1',
      phone: '99999',
      latitude: -27.0747279,
      longitude: -49.4889672,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'test2',
      phone: '99999',
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.0747279,
      userLongitude: -49.4889672,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
