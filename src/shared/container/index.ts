import { container } from 'tsyringe';

import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository';

import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { BCryptHashProvider } from '@/infra/providers/HashProvider/implementations/BCryptHashProvider';

import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';
import { JWTTokenProvider } from '@/infra/providers/TokenProvider/implementations/JWTTokenProvider';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  MongoUserRepository
);
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider); 