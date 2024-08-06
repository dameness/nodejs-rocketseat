import { describe, expect, it } from 'vitest';
import { beforeEach } from 'vitest';

import { SearchGymsUseCase } from './search-gyms';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();

    sut = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'gym-01 adsadas',
      description: 'test1',
      phone: '99999',
      latitude: 0,
      longitude: 0,
    });

    await gymsRepository.create({
      title: 'gym-01 dasd a ',
      description: 'test2',
      phone: '99999',
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await sut.execute({
      query: 'gym-01',
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ description: 'test1' }),
      expect.objectContaining({ description: 'test2' }),
    ]);
  });

  it('should be search for gyms with pagination', async () => {
    for (let i = 1; i <= 11; i++) {
      await gymsRepository.create({
        title: 'gym-01 x',
        description: 'test1',
        phone: '99999',
        latitude: 0,
        longitude: 0,
      });
    }

    for (let i = 1; i <= 11; i++) {
      await gymsRepository.create({
        title: 'test1',
        description: 'gym-01 a',
        phone: '99999',
        latitude: 0,
        longitude: 0,
      });
    }

    const { gyms: firstPage } = await sut.execute({
      query: 'gym-01',
      page: 1,
    });
    const { gyms: secondPage } = await sut.execute({
      query: 'gym-01',
      page: 2,
    });

    expect(firstPage).toHaveLength(20);
    expect(secondPage).toHaveLength(2);
  });
});
