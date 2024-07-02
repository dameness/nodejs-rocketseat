import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    //unit test!! - não acessa o banco de dado, testa a pequena parte, rápido
    const registerUseCase = new RegisterUseCase({
      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },

      async findByEmail(email) {
        return null;
      },
    });

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
});
