import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    //unit test!! - não acessa o banco de dado, testa a pequena parte, rápido

    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'test',
      email: 'test@mail.com',
      password: '123423',
    });

    expect(user.id).toBeTypeOf('string');
  });

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: 'test',
      email: 'test@mail.com',
      password: '123423',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123423',
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = 'mail@mail.com';

    await registerUseCase.execute({
      name: 'test',
      email,
      password: '123423',
    });

    expect(() =>
      registerUseCase.execute({
        name: 'test',
        email,
        password: '123423',
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
