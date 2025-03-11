import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ExperienceUseCase } from '@/application/useCases/ExperienceUseCase';

export class ExperienceController {
  async create(request: Request, response: Response): Promise<Response> {
    const { role, company, period, description } = request.body;

    const experienceUseCase = container.resolve(ExperienceUseCase);
    const experience = await experienceUseCase.create({
      role,
      company,
      period,
      description
    });

    return response.status(201).json(experience);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const experienceUseCase = container.resolve(ExperienceUseCase);
    const experience = await experienceUseCase.findById(id);

    if (!experience) {
      return response.status(404).json({ error: 'Experience not found' });
    }

    return response.json(experience);
  }

  async list(_request: Request, response: Response): Promise<Response> {
    const experienceUseCase = container.resolve(ExperienceUseCase);
    const experiences = await experienceUseCase.list();

    return response.json(experiences);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { role, company, period, description } = request.body;

    const experienceUseCase = container.resolve(ExperienceUseCase);

    const experience = await experienceUseCase.update(id, {
      role,
      company,
      period,
      description
    });

    return response.json(experience);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const experienceUseCase = container.resolve(ExperienceUseCase);
    await experienceUseCase.delete(id);

    return response.status(204).send();
  }

  async seed(_request: Request, response: Response): Promise<Response> {
    const experienceUseCase = container.resolve(ExperienceUseCase);
    await experienceUseCase.seedExperiences();

    return response.status(201).json({ message: 'Experiences seeded successfully' });
  }
} 