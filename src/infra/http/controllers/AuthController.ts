import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { AuthUseCase } from '../../../application/useCases/AuthUseCase';

export class AuthController {
  async authenticate(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { username, password } = request.body;

      const authUseCase = container.resolve(AuthUseCase);

      const auth = await authUseCase.execute({
        username,
        password
      });

      return response.json(auth);
    } catch (error) {
      next(error);
    }
  }
} 