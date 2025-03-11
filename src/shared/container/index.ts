import { container } from 'tsyringe';

import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { MongoUserRepository } from '@/infra/database/repositories/MongoUserRepository';

import { ISkillRepository } from '@/domain/repositories/ISkillRepository';
import { MongoSkillRepository } from '@/infra/database/repositories/MongoSkillRepository';

import { ILanguageRepository } from '@/domain/repositories/ILanguageRepository';
import { MongoLanguageRepository } from '@/infra/database/repositories/MongoLanguageRepository';

import { IEducationRepository } from '@/domain/repositories/IEducationRepository';
import { MongoEducationRepository } from '@/infra/database/repositories/MongoEducationRepository';

import { IExperienceRepository } from '@/domain/repositories/IExperienceRepository';
import { MongoExperienceRepository } from '@/infra/database/repositories/MongoExperienceRepository';

import { ICertificateRepository } from '@/domain/repositories/ICertificateRepository';
import { MongoCertificateRepository } from '@/infra/database/repositories/MongoCertificateRepository';

import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { BCryptHashProvider } from '@/infra/providers/HashProvider/implementations/BCryptHashProvider';

import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';
import { JWTTokenProvider } from '@/infra/providers/TokenProvider/implementations/JWTTokenProvider';

container.registerSingleton<IUserRepository>(
  'UserRepository',
  MongoUserRepository
);

container.registerSingleton<ISkillRepository>(
  'SkillRepository',
  MongoSkillRepository
);

container.registerSingleton<ILanguageRepository>(
  'LanguageRepository',
  MongoLanguageRepository
);

container.registerSingleton<IEducationRepository>(
  'EducationRepository',
  MongoEducationRepository
);

container.registerSingleton<IExperienceRepository>(
  'ExperienceRepository',
  MongoExperienceRepository
);

container.registerSingleton<ICertificateRepository>(
  'CertificateRepository',
  MongoCertificateRepository
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider); 