import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserUseCase } from '@/application/useCases/UserUseCase';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const userUseCase = container.resolve(UserUseCase);

    const user = await userUseCase.create({
      username,
      password
    });

    return response.status(201).json(user);
  }

  async profile(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userUseCase = container.resolve(UserUseCase);
    const user = await userUseCase.findById(id);

    return response.json(user);
  }
} 