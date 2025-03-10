import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { ITokenProvider } from '@/infra/providers/TokenProvider/ITokenProvider';
import { AppError } from '@/shared/errors/AppError';

export async function authMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token não fornecido', 401);
    }

    const [, token] = authHeader.split(' ');

    const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');
        
    const userId = await tokenProvider.verifyToken(token);

    request.user = {
      id: userId
    };

    return next();
  } catch (error) {
    next(error);
  }
} 