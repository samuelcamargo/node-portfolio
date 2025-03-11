import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LanguageUseCase } from '@/application/useCases/LanguageUseCase';

export class LanguageController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, level } = request.body;

    const languageUseCase = container.resolve(LanguageUseCase);
    const language = await languageUseCase.create({
      name,
      level
    });

    return response.status(201).json(language);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const languageUseCase = container.resolve(LanguageUseCase);
    const language = await languageUseCase.findById(id);

    if (!language) {
      return response.status(404).json({ error: 'Language not found' });
    }

    return response.json(language);
  }

  async list(_request: Request, response: Response): Promise<Response> {
    const languageUseCase = container.resolve(LanguageUseCase);
    const languages = await languageUseCase.list();

    return response.json(languages);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, level } = request.body;

    const languageUseCase = container.resolve(LanguageUseCase);

    const language = await languageUseCase.update(id, {
      name,
      level
    });

    return response.json(language);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const languageUseCase = container.resolve(LanguageUseCase);
    await languageUseCase.delete(id);

    return response.status(204).send();
  }

  async seed(_request: Request, response: Response): Promise<Response> {
    const languageUseCase = container.resolve(LanguageUseCase);
    await languageUseCase.seedLanguages();

    return response.status(201).json({ message: 'Languages seeded successfully' });
  }
} 