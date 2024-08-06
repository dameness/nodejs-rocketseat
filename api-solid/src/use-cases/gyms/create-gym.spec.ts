import { describe, expect, it } from 'vitest';
import { CreateGymUseCase } from './create-gym';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { beforeEach } from 'vitest';

let gymsRepository: InMemoryGymsRepository;
// sut --> system under test
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'gym',
      description: 'description',
      phone: '99999',
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toBeTypeOf('string');
  });
});
