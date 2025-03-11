import { inject, injectable } from 'tsyringe';
import { ISkillRepository } from '@/domain/repositories/ISkillRepository';
import { Skill } from '@/domain/entities/Skill';
import { AppError } from '@/shared/errors/AppError';

interface ICreateSkillDTO {
    name: string;
    level: string;
    category: string;
}

interface IUpdateSkillDTO {
  name?: string;
  level?: string;
  category?: string;
}

@injectable()
export class SkillUseCase {
  constructor(
    @inject('SkillRepository')
    private skillRepository: ISkillRepository,
  ) {}

  async create({ name, level, category }: ICreateSkillDTO): Promise<Skill> {
    const skillExists = await this.skillRepository.findByName(name);

    if (skillExists) {
      throw new AppError('Skill with this name already exists');
    }

    const skill = new Skill({
      name,
      level,
      category
    });

    return this.skillRepository.save(skill);
  }

  async findByName(name: string): Promise<Skill | null> {
    return this.skillRepository.findByName(name);
  }

  async findById(id: string): Promise<Skill | null> {
    return this.skillRepository.findById(id);
  }

  async list(): Promise<Skill[]> {
    return this.skillRepository.findAll();
  }

  async update(id: string, data: IUpdateSkillDTO): Promise<Skill> {
    const skill = await this.skillRepository.findById(id);

    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    if (data.name && data.name !== skill.name) {
      const nameExists = await this.skillRepository.findByName(data.name);
      if (nameExists && nameExists.id !== id) {
        throw new AppError('Skill with this name already exists');
      }
      skill.name = data.name;
    }

    if (data.level) {
      skill.level = data.level;
    }

    if (data.category) {
      skill.category = data.category;
    }

    return this.skillRepository.save(skill);
  }

  async delete(id: string): Promise<void> {
    const skill = await this.skillRepository.findById(id);

    if (!skill) {
      throw new AppError('Skill not found', 404);
    }

    await this.skillRepository.delete(id);
  }

  async seedSkills(): Promise<void> {
    const skills = [
      // Backend
      { name: 'PHP', level: 'Avançado', category: 'Backend' },
      { name: 'Laravel', level: 'Avançado', category: 'Backend' },
      { name: 'Node.js', level: 'Avançado', category: 'Backend' },
      { name: 'Express.js', level: 'Avançado', category: 'Backend' },
      { name: 'Fastify', level: 'Intermediário', category: 'Backend' },
      { name: 'REST APIs', level: 'Avançado', category: 'Backend' },
      { name: 'GraphQL', level: 'Intermediário', category: 'Backend' },
      { name: 'Microservices', level: 'Avançado', category: 'Backend' },
      { name: 'WebSockets', level: 'Intermediário', category: 'Backend' },
      
      // Frontend
      { name: 'TypeScript', level: 'Avançado', category: 'Frontend' },
      { name: 'JavaScript', level: 'Avançado', category: 'Frontend' },
      { name: 'React', level: 'Avançado', category: 'Frontend' },
      { name: 'Next.js', level: 'Avançado', category: 'Frontend' },
      { name: 'Material UI', level: 'Avançado', category: 'Frontend' },
      { name: 'Tailwind CSS', level: 'Intermediário', category: 'Frontend' },
      { name: 'Redux', level: 'Avançado', category: 'Frontend' },
      { name: 'HTML5/CSS3', level: 'Avançado', category: 'Frontend' },
      
      // Database
      { name: 'MySQL', level: 'Avançado', category: 'Database' },
      { name: 'MongoDB', level: 'Intermediário', category: 'Database' },
      { name: 'PostgreSQL', level: 'Intermediário', category: 'Database' },
      { name: 'Redis', level: 'Intermediário', category: 'Database' },
      
      // DevOps
      { name: 'Docker', level: 'Avançado', category: 'DevOps' },
      { name: 'CI/CD', level: 'Avançado', category: 'DevOps' },
      { name: 'Git', level: 'Avançado', category: 'DevOps' },
      { name: 'AWS', level: 'Intermediário', category: 'DevOps' },
      { name: 'Linux', level: 'Avançado', category: 'DevOps' },
      { name: 'Jenkins', level: 'Intermediário', category: 'DevOps' },
      
      // Arquitetura
      { name: 'Clean Architecture', level: 'Avançado', category: 'Arquitetura' },
      { name: 'SOLID', level: 'Avançado', category: 'Arquitetura' },
      { name: 'Design Patterns', level: 'Avançado', category: 'Arquitetura' },
      { name: 'DDD', level: 'Avançado', category: 'Arquitetura' },
      { name: 'TDD', level: 'Avançado', category: 'Arquitetura' },
      { name: 'Event-Driven', level: 'Intermediário', category: 'Arquitetura' },
      
      // Gestão
      { name: 'Scrum', level: 'Avançado', category: 'Gestão' },
      { name: 'Kanban', level: 'Avançado', category: 'Gestão' },
      { name: 'Liderança', level: 'Avançado', category: 'Gestão' },
      { name: 'OKR', level: 'Intermediário', category: 'Gestão' },
      { name: 'Gestão de Times', level: 'Avançado', category: 'Gestão' }
    ];

    for (const skillData of skills) {
      const existingSkill = await this.skillRepository.findByName(skillData.name);
      if (!existingSkill) {
        const skill = new Skill(skillData);
        await this.skillRepository.save(skill);
      }
    }
  }
} 