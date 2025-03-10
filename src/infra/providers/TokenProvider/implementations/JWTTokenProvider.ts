import { injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { ITokenProvider } from '../ITokenProvider';
import { AppError } from '@/shared/errors/AppError';

@injectable()
export class JWTTokenProvider implements ITokenProvider {
  async generateToken(userId: string): Promise<string> {
    const token = jwt.sign({}, process.env.JWT_SECRET || '', {
      subject: userId,
      expiresIn: '1d'
    });

    return token;
  }

  async verifyToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
            
      const { sub } = decoded as { sub: string };

      return sub;
    } catch {
      throw new AppError('Token inválido', 401);
    }
  }
} 