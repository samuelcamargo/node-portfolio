import { inject, injectable } from 'tsyringe';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { User } from '@/domain/entities/User';
import { AppError } from '@/shared/errors/AppError';

interface ICreateUserDTO {
    username: string;
    password: string;
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
} 