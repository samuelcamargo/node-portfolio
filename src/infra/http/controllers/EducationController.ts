import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { EducationUseCase } from '@/application/useCases/EducationUseCase';

export class EducationController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, institution, period } = request.body;

    const educationUseCase = container.resolve(EducationUseCase);
    const education = await educationUseCase.create({
      title,
      institution,
      period
    });

    return response.status(201).json(education);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const educationUseCase = container.resolve(EducationUseCase);
    const education = await educationUseCase.findById(id);

    if (!education) {
      return response.status(404).json({ error: 'Education not found' });
    }

    return response.json(education);
  }

  async list(_request: Request, response: Response): Promise<Response> {
    const educationUseCase = container.resolve(EducationUseCase);
    const educations = await educationUseCase.list();

    return response.json(educations);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, institution, period } = request.body;

    const educationUseCase = container.resolve(EducationUseCase);

    const education = await educationUseCase.update(id, {
      title,
      institution,
      period
    });

    return response.json(education);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const educationUseCase = container.resolve(EducationUseCase);
    await educationUseCase.delete(id);

    return response.status(204).send();
  }

  async seed(_request: Request, response: Response): Promise<Response> {
    const educationUseCase = container.resolve(EducationUseCase);
    await educationUseCase.seedEducation();

    return response.status(201).json({ message: 'Education records seeded successfully' });
  }
} 