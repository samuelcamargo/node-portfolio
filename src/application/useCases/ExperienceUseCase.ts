import { inject, injectable } from 'tsyringe';
import { IExperienceRepository } from '@/domain/repositories/IExperienceRepository';
import { Experience } from '@/domain/entities/Experience';
import { AppError } from '@/shared/errors/AppError';

interface ICreateExperienceDTO {
    role: string;
    company: string;
    period: string;
    description: string;
}

interface IUpdateExperienceDTO {
  role?: string;
  company?: string;
  period?: string;
  description?: string;
}

@injectable()
export class ExperienceUseCase {
  constructor(
    @inject('ExperienceRepository')
    private experienceRepository: IExperienceRepository,
  ) {}

  async create({ role, company, period, description }: ICreateExperienceDTO): Promise<Experience> {
    const experienceExists = await this.experienceRepository.findByRoleAndCompany(role, company);

    if (experienceExists) {
      throw new AppError('Experience with this role and company already exists');
    }

    const experience = new Experience({
      role,
      company,
      period,
      description
    });

    return this.experienceRepository.save(experience);
  }

  async findByRoleAndCompany(role: string, company: string): Promise<Experience | null> {
    return this.experienceRepository.findByRoleAndCompany(role, company);
  }

  async findById(id: string): Promise<Experience | null> {
    return this.experienceRepository.findById(id);
  }

  async list(): Promise<Experience[]> {
    return this.experienceRepository.findAll();
  }

  async update(id: string, data: IUpdateExperienceDTO): Promise<Experience> {
    const experience = await this.experienceRepository.findById(id);

    if (!experience) {
      throw new AppError('Experience not found', 404);
    }

    if ((data.role && data.role !== experience.role) || (data.company && data.company !== experience.company)) {
      if (data.role && data.company) {
        const existingExperience = await this.experienceRepository.findByRoleAndCompany(data.role, data.company);
        if (existingExperience && existingExperience.id !== id) {
          throw new AppError('Experience with this role and company already exists');
        }
      }
    }

    if (data.role) {
      experience.role = data.role;
    }

    if (data.company) {
      experience.company = data.company;
    }

    if (data.period) {
      experience.period = data.period;
    }

    if (data.description) {
      experience.description = data.description;
    }

    return this.experienceRepository.save(experience);
  }

  async delete(id: string): Promise<void> {
    const experience = await this.experienceRepository.findById(id);

    if (!experience) {
      throw new AppError('Experience not found', 404);
    }

    await this.experienceRepository.delete(id);
  }

  async seedExperiences(): Promise<void> {
    const experiences = [
      {
        role: 'Gerente de TI',
        company: 'Campsoft',
        period: 'agosto de 2023 - Presente',
        description: 'Liderança de equipes técnicas, gestão de projetos com metodologias ágeis (Scrum), documentação estratégica e otimização de processos.'
      },
      {
        role: 'Líder Técnico',
        company: 'Campsoft',
        period: 'dezembro de 2020 - agosto de 2023',
        description: 'Gerenciamento de equipes de desenvolvimento, arquitetura de sistemas, implementação de soluções e revisão de código.'
      },
      {
        role: 'Programador Full Stack',
        company: 'Campsoft',
        period: 'julho de 2020 - dezembro de 2020',
        description: 'Desenvolvimento de aplicações back-end e front-end, utilizando PHP, JavaScript, e integração com APIs.'
      },
      {
        role: 'PHP Developer',
        company: 'Gmaxcorp',
        period: 'agosto de 2014 - julho de 2020',
        description: 'Desenvolvimento de websites e e-commerce, desenvolvimento de aplicações, design de sistemas, implantação, documentação e levantamento de requisitos.'
      },
      {
        role: 'Program Developer',
        company: 'Foursys',
        period: 'janeiro de 2013 - dezembro de 2013',
        description: 'Manutenção de sistemas legados do Banco Bradesco em VisualBasic, desenvolvimento de sistemas com Crystal Report.'
      },
      {
        role: 'Systems Analyst',
        company: 'Top Website',
        period: 'maio de 2012 - outubro de 2012',
        description: 'Análise e desenvolvimento de sistemas para internet, planejamento e implementação de soluções web.'
      },
      {
        role: 'Front End Developer',
        company: 'Habilis BR',
        period: 'janeiro de 2011 - maio de 2012',
        description: 'Desenvolvimento front-end com foco em CSS/CSS3, JavaScript, jQuery e integração com APIs.'
      },
      {
        role: 'Analista de Planejamento',
        company: 'Teltelematica',
        period: 'janeiro de 2010 - dezembro de 2010',
        description: 'Liderança de departamento com 800 funcionários de telecomunicações, elaboração e apresentação de relatórios, análise de desempenho.'
      }
    ];

    for (const experienceData of experiences) {
      const existingExperience = await this.experienceRepository.findByRoleAndCompany(
        experienceData.role, 
        experienceData.company
      );
      
      if (!existingExperience) {
        const experience = new Experience(experienceData);
        await this.experienceRepository.save(experience);
      }
    }
  }
} 