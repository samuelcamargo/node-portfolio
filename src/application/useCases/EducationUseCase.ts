import { inject, injectable } from 'tsyringe';
import { IEducationRepository } from '@/domain/repositories/IEducationRepository';
import { Education } from '@/domain/entities/Education';
import { AppError } from '@/shared/errors/AppError';

interface ICreateEducationDTO {
    title: string;
    institution: string;
    period: string;
}

interface IUpdateEducationDTO {
  title?: string;
  institution?: string;
  period?: string;
}

@injectable()
export class EducationUseCase {
  constructor(
    @inject('EducationRepository')
    private educationRepository: IEducationRepository,
  ) {}

  async create({ title, institution, period }: ICreateEducationDTO): Promise<Education> {
    const educationExists = await this.educationRepository.findByTitle(title);

    if (educationExists) {
      throw new AppError('Education with this title already exists');
    }

    const education = new Education({
      title,
      institution,
      period
    });

    return this.educationRepository.save(education);
  }

  async findByTitle(title: string): Promise<Education | null> {
    return this.educationRepository.findByTitle(title);
  }

  async findById(id: string): Promise<Education | null> {
    return this.educationRepository.findById(id);
  }

  async list(): Promise<Education[]> {
    return this.educationRepository.findAll();
  }

  async update(id: string, data: IUpdateEducationDTO): Promise<Education> {
    const education = await this.educationRepository.findById(id);

    if (!education) {
      throw new AppError('Education not found', 404);
    }

    if (data.title && data.title !== education.title) {
      const titleExists = await this.educationRepository.findByTitle(data.title);
      if (titleExists && titleExists.id !== id) {
        throw new AppError('Education with this title already exists');
      }
      education.title = data.title;
    }

    if (data.institution) {
      education.institution = data.institution;
    }

    if (data.period) {
      education.period = data.period;
    }

    return this.educationRepository.save(education);
  }

  async delete(id: string): Promise<void> {
    const education = await this.educationRepository.findById(id);

    if (!education) {
      throw new AppError('Education not found', 404);
    }

    await this.educationRepository.delete(id);
  }

  async seedEducation(): Promise<void> {
    const education = [
      {
        title: 'Pós-graduação em Inteligência Artificial Nos Negócios',
        institution: 'Universidade Anhembi Morumbi',
        period: '2024 - 2025'
      },
      {
        title: 'MBA em Gestão de Projetos',
        institution: 'Universidade Anhembi Morumbi',
        period: '2023 - 2024'
      },
      {
        title: 'Graduação em Gestão de TI',
        institution: 'Estácio',
        period: '2013 - 2016'
      },
      {
        title: 'Bacharel em Sistemas da Informação',
        institution: 'Universidade Bandeirante de São Paulo',
        period: '2009 - 2012'
      }
    ];

    for (const educationData of education) {
      const existingEducation = await this.educationRepository.findByTitle(educationData.title);
      if (!existingEducation) {
        const newEducation = new Education(educationData);
        await this.educationRepository.save(newEducation);
      }
    }
  }
} 