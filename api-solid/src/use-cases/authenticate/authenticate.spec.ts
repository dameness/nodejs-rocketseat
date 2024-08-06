import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { beforeEach } from 'vitest';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'test',
      email: 'mail@mail.com',
      password_hash: await hash('123456', 6),
    });

    const { user } = await sut.execute({
      email: 'mail@mail.com',
      password: '123456',
    });

    expect(user.id).toBeTypeOf('string');
  });

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'mail@mail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'test',
      email: 'mail@mail.com',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      sut.execute({
        email: 'mail@mail.com',
        password: '654321',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
