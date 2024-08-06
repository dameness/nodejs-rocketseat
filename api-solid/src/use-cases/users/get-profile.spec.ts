import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetProfileUseCase } from './get-profile';
import { hash } from 'bcryptjs';
import { beforeEach } from 'vitest';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository;
let sut: GetProfileUseCase;

describe('Get Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'test',
      email: 'mail@mail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toBeTypeOf('string');
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
