import { IEducation } from '../interfaces/IEducation';

export interface IEducationRepository {
  findByTitle(title: string): Promise<IEducation | null>;
  save(education: IEducation): Promise<IEducation>;
  findById(id: string): Promise<IEducation | null>;
  findAll(): Promise<IEducation[]>;
  delete(id: string): Promise<void>;
} 