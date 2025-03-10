import 'reflect-metadata';
import { container } from 'tsyringe';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';

// Mock dos providers para testes
container.registerInstance<IUserRepository>('UserRepository', {
  findByUsername: jest.fn(),
  save: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn()
});

container.registerInstance<IHashProvider>('HashProvider', {
  generateHash: jest.fn(),
  compareHash: jest.fn()
});

container.registerInstance<ITokenProvider>('TokenProvider', {
  generateToken: jest.fn(),
  verifyToken: jest.fn()
}); 