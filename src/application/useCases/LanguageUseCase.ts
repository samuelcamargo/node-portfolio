import { inject, injectable } from 'tsyringe';
import { ILanguageRepository } from '@/domain/repositories/ILanguageRepository';
import { Language } from '@/domain/entities/Language';
import { AppError } from '@/shared/errors/AppError';

interface ICreateLanguageDTO {
    name: string;
    level: string;
}

interface IUpdateLanguageDTO {
  name?: string;
  level?: string;
}

@injectable()
export class LanguageUseCase {
  constructor(
    @inject('LanguageRepository')
    private languageRepository: ILanguageRepository,
  ) {}

  async create({ name, level }: ICreateLanguageDTO): Promise<Language> {
    const languageExists = await this.languageRepository.findByName(name);

    if (languageExists) {
      throw new AppError('Language with this name already exists');
    }

    const language = new Language({
      name,
      level
    });

    return this.languageRepository.save(language);
  }

  async findByName(name: string): Promise<Language | null> {
    return this.languageRepository.findByName(name);
  }

  async findById(id: string): Promise<Language | null> {
    return this.languageRepository.findById(id);
  }

  async list(): Promise<Language[]> {
    return this.languageRepository.findAll();
  }

  async update(id: string, data: IUpdateLanguageDTO): Promise<Language> {
    const language = await this.languageRepository.findById(id);

    if (!language) {
      throw new AppError('Language not found', 404);
    }

    if (data.name && data.name !== language.name) {
      const nameExists = await this.languageRepository.findByName(data.name);
      if (nameExists && nameExists.id !== id) {
        throw new AppError('Language with this name already exists');
      }
      language.name = data.name;
    }

    if (data.level) {
      language.level = data.level;
    }

    return this.languageRepository.save(language);
  }

  async delete(id: string): Promise<void> {
    const language = await this.languageRepository.findById(id);

    if (!language) {
      throw new AppError('Language not found', 404);
    }

    await this.languageRepository.delete(id);
  }

  async seedLanguages(): Promise<void> {
    const languages = [
      { name: 'Português', level: 'Nativo' },
      { name: 'Inglês', level: 'Profissional' },
      { name: 'Inglês Técnico', level: 'Profissional' }
    ];

    for (const languageData of languages) {
      const existingLanguage = await this.languageRepository.findByName(languageData.name);
      if (!existingLanguage) {
        const language = new Language(languageData);
        await this.languageRepository.save(language);
      }
    }
  }
} 