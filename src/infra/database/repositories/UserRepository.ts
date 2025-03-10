import { Repository } from 'typeorm';
import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { AppDataSource } from '@/database';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { username } });
    return user || null;
  }

  async create(user: User): Promise<User> {
    return await this.repository.save(user);
  }
} 