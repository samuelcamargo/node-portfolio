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

    return response.status(201).json({
      id: user.id,
      username: user.username
    });
  }

  async profile(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userUseCase = container.resolve(UserUseCase);
    const user = await userUseCase.findById(id);

    return response.json({
      id: user?.id,
      username: user?.username
    });
  }

  async list(_request: Request, response: Response): Promise<Response> {
    const userUseCase = container.resolve(UserUseCase);
    const users = await userUseCase.list();

    return response.json(users.map(user => ({
      id: user.id,
      username: user.username
    })));
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { username, password } = request.body;

    const userUseCase = container.resolve(UserUseCase);

    const user = await userUseCase.update(id, {
      username,
      password
    });

    return response.json({
      id: user.id,
      username: user.username
    });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const userUseCase = container.resolve(UserUseCase);
    await userUseCase.delete(id);

    return response.status(204).send();
  }
} 