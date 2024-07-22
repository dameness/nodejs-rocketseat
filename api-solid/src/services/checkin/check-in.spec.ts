import { describe, expect, it } from 'vitest';
import { CheckInUseCase } from './check-in';
import { beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it('should be able to register a check-in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    expect(checkIn.id).toBeTypeOf('string');
  });
});
