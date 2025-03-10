import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { User } from '@/domain/entities/User';
import { AppError } from '@/shared/errors/AppError';

interface ICreateUserDTO {
    username: string;
    password: string;
}

interface IUpdateUserDTO {
  username?: string;
  password?: string;
}

@injectable()
export class UserUseCase {
  constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        
        @inject('HashProvider')
        private hashProvider: IHashProvider
  ) {}

  async create({ username, password }: ICreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByUsername(username);

    if (userExists) {
      throw new AppError('Username already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = new User({
      username,
      password: hashedPassword
    });

    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async list(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async update(id: string, data: IUpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (data.username) {
      const userWithUsername = await this.userRepository.findByUsername(data.username);
      if (userWithUsername && userWithUsername.id !== id) {
        throw new AppError('Username already exists');
      }
      user.username = data.username;
    }

    if (data.password) {
      user.password = await this.hashProvider.generateHash(data.password);
    }

    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    await this.userRepository.delete(id);
  }
} 