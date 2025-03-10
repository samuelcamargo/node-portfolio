import 'reflect-metadata';
import { UserUseCase } from './UserUseCase';
import { AppError } from '@/shared/errors/AppError';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { User } from '@/domain/entities/User';

interface IMocks {
  userRepository: jest.Mocked<IUserRepository>;
  hashProvider: jest.Mocked<IHashProvider>;
}

describe('UserUseCase', () => {
  let userUseCase: UserUseCase;
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
        generateHash: jest.fn(),
        compareHash: jest.fn()
      } as jest.Mocked<IHashProvider>
    };

    userUseCase = new UserUseCase(
      mocks.userRepository,
      mocks.hashProvider
    );
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = {
        username: 'test-user',
        password: 'password123'
      };

      mocks.userRepository.findByUsername.mockResolvedValue(null);
      mocks.hashProvider.generateHash.mockResolvedValue('hashed-password');
      mocks.userRepository.save.mockResolvedValue({
        id: 'user-id',
        ...userData,
        password: 'hashed-password'
      } as User);

      const user = await userUseCase.create(userData);

      expect(user).toHaveProperty('id');
      expect(user.username).toBe(userData.username);
      expect(mocks.userRepository.findByUsername).toHaveBeenCalledWith(userData.username);
      expect(mocks.hashProvider.generateHash).toHaveBeenCalledWith(userData.password);
    });

    it('should not create user with existing username', async () => {
      const userData = {
        username: 'existing-user',
        password: 'password123'
      };

      mocks.userRepository.findByUsername.mockResolvedValue({
        id: 'existing-id',
        username: 'existing-user',
        password: 'hashed-password'
      } as User);

      await expect(userUseCase.create(userData)).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('update', () => {
    it('should update user data', async () => {
      const userId = 'user-id';
      const updateData = {
        username: 'new-username'
      };

      const existingUser = {
        id: userId,
        username: 'old-username',
        password: 'old-password'
      } as User;

      mocks.userRepository.findById.mockResolvedValue(existingUser);
      mocks.userRepository.findByUsername.mockResolvedValue(null);
      mocks.userRepository.save.mockResolvedValue({
        ...existingUser,
        ...updateData
      } as User);

      const updatedUser = await userUseCase.update(userId, updateData);

      expect(updatedUser.username).toBe(updateData.username);
      expect(mocks.userRepository.findById).toHaveBeenCalledWith(userId);
    });

    it('should not update non-existing user', async () => {
      mocks.userRepository.findById.mockResolvedValue(null);

      await expect(userUseCase.update('invalid-id', {})).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('delete', () => {
    it('should delete existing user', async () => {
      const userId = 'user-id';
      mocks.userRepository.findById.mockResolvedValue({
        id: userId,
        username: 'test-user',
        password: 'hashed-password'
      } as User);

      await userUseCase.delete(userId);

      expect(mocks.userRepository.delete).toHaveBeenCalledWith(userId);
    });

    it('should not delete non-existing user', async () => {
      mocks.userRepository.findById.mockResolvedValue(null);

      await expect(userUseCase.delete('invalid-id')).rejects.toBeInstanceOf(AppError);
    });
  });
}); 