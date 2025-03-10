import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, process.env.JWT_SECRET as string);
    return next();
  } catch {
    return response.status(401).json({ error: 'Token inválido' });
  }
} 