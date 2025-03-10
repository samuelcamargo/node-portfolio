import { IUser } from '../interfaces/IUser';

export interface IUserRepository {
  findByUsername(username: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  delete(id: string): Promise<void>;
} 