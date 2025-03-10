import { container } from 'tsyringe';

import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { UserRepository } from '@/infra/database/repositories/UserRepository';

import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { BCryptHashProvider } from '@/infra/providers/HashProvider/implementations/BCryptHashProvider';

import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';
import { JWTTokenProvider } from '@/infra/providers/TokenProvider/implementations/JWTTokenProvider';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider); 