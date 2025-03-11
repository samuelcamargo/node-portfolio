import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SkillUseCase } from '@/application/useCases/SkillUseCase';

export class SkillController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, level, category } = request.body;

    const skillUseCase = container.resolve(SkillUseCase);
    const skill = await skillUseCase.create({
      name,
      level,
      category
    });

    return response.status(201).json(skill);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const skillUseCase = container.resolve(SkillUseCase);
    const skill = await skillUseCase.findById(id);

    if (!skill) {
      return response.status(404).json({ error: 'Skill not found' });
    }

    return response.json(skill);
  }

  async list(_request: Request, response: Response): Promise<Response> {
    const skillUseCase = container.resolve(SkillUseCase);
    const skills = await skillUseCase.list();

    return response.json(skills);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, level, category } = request.body;

    const skillUseCase = container.resolve(SkillUseCase);

    const skill = await skillUseCase.update(id, {
      name,
      level,
      category
    });

    return response.json(skill);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const skillUseCase = container.resolve(SkillUseCase);
    await skillUseCase.delete(id);

    return response.status(204).send();
  }

  async seed(_request: Request, response: Response): Promise<Response> {
    const skillUseCase = container.resolve(SkillUseCase);
    await skillUseCase.seedSkills();

    return response.status(201).json({ message: 'Skills seeded successfully' });
  }
} 