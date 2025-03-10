import { inject, injectable } from 'tsyringe';
import { AuthRequestDTO, AuthResponseDTO } from '../dtos/AuthDTO';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { IHashProvider } from '@/infra/providers/HashProvider/IHashProvider';
import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';
import { AppError } from '@/shared/errors/AppError';

@injectable()
export class AuthUseCase {
  constructor(
        @inject('UserRepository')
        private userRepository: IUserRepository,
        
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        
        @inject('TokenProvider')
        private tokenProvider: ITokenProvider
  ) {}

  async execute({ username, password }: AuthRequestDTO): Promise<AuthResponseDTO> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Usuário ou senha inválidos', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Usuário ou senha inválidos', 401);
    }

    const token = await this.tokenProvider.generateToken(user.id);
    const expire_in = Date.now() + 24 * 60 * 60 * 1000; // 24 horas

    return {
      token,
      expire_in
    };
  }
} 