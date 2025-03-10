import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { UserRepository } from '@/infra/database/repositories/UserRepository';

export class AuthController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const userRepository = new UserRepository();
    const user = await userRepository.findByUsername(username);

    if (!user) {
      return response.status(401).json({ error: 'Usuário não encontrado' });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).json({ error: 'Senha incorreta' });
    }

    const token = sign({}, process.env.JWT_SECRET as string, {
      subject: user.id,
      expiresIn: '1d'
    });

    const now = new Date();
    const expire_in = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return response.json({
      token,
      expire_in: expire_in.getTime()
    });
  }
} 