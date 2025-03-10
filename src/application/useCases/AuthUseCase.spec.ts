import 'reflect-metadata';
import { AuthUseCase } from './AuthUseCase';
import { AppError } from '@/shared/errors/AppError';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';

interface IMocks {
  userRepository: jest.Mocked<IUserRepository>;
  hashProvider: jest.Mocked<IHashProvider>;
  tokenProvider: jest.Mocked<ITokenProvider>;
}

describe('AuthUseCase', () => {
  let authUseCase: AuthUseCase;
  let mocks: IMocks;

  beforeEach(() => {
    mocks = {
      userRepository: {
        findByUsername: jest.fn(),
        save: jest.fn(),
        findById: jest.fn(),
        findAll: jest.fn(),
        delete: jest.fn()
      } as jest.Mocked<IUserRepository>,

      hashProvider: {
        compareHash: jest.fn(),
        generateHash: jest.fn()
      } as jest.Mocked<IHashProvider>,

      tokenProvider: {
        generateToken: jest.fn(),
        verifyToken: jest.fn()
      } as jest.Mocked<ITokenProvider>
    };

    authUseCase = new AuthUseCase(
      mocks.userRepository,
      mocks.hashProvider,
      mocks.tokenProvider
    );
  });

  it('should authenticate with valid credentials', async () => {
    const user = {
      id: 'user-id',
      username: 'test-user',
      password: 'hashed-password'
    };

    mocks.userRepository.findByUsername.mockResolvedValue(user);
    mocks.hashProvider.compareHash.mockResolvedValue(true);
    mocks.tokenProvider.generateToken.mockResolvedValue('generated-token');

    const auth = await authUseCase.execute({
      username: 'test-user',
      password: 'correct-password'
    });

    expect(auth).toHaveProperty('token');
    expect(auth).toHaveProperty('expire_in');
    expect(mocks.userRepository.findByUsername).toHaveBeenCalledWith('test-user');
    expect(mocks.hashProvider.compareHash).toHaveBeenCalledWith('correct-password', 'hashed-password');
    expect(mocks.tokenProvider.generateToken).toHaveBeenCalledWith('user-id');
  });

  it('should not authenticate with invalid username', async () => {
    mocks.userRepository.findByUsername.mockResolvedValue(null);

    await expect(authUseCase.execute({
      username: 'invalid-user',
      password: 'any-password'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate with invalid password', async () => {
    const user = {
      id: 'user-id',
      username: 'test-user',
      password: 'hashed-password'
    };

    mocks.userRepository.findByUsername.mockResolvedValue(user);
    mocks.hashProvider.compareHash.mockResolvedValue(false);

    await expect(authUseCase.execute({
      username: 'test-user',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });
}); 