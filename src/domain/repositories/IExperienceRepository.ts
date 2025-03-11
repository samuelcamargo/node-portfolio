import { IExperience } from '../interfaces/IExperience';

export interface IExperienceRepository {
  findByRoleAndCompany(role: string, company: string): Promise<IExperience | null>;
  save(experience: IExperience): Promise<IExperience>;
  findById(id: string): Promise<IExperience | null>;
  findAll(): Promise<IExperience[]>;
  delete(id: string): Promise<void>;
} 