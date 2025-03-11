import { ILanguage } from '../interfaces/ILanguage';

export interface ILanguageRepository {
  findByName(name: string): Promise<ILanguage | null>;
  save(language: ILanguage): Promise<ILanguage>;
  findById(id: string): Promise<ILanguage | null>;
  findAll(): Promise<ILanguage[]>;
  delete(id: string): Promise<void>;
} 