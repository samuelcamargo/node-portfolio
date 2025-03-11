import { ISkill } from '../interfaces/ISkill';

export interface ISkillRepository {
  findByName(name: string): Promise<ISkill | null>;
  save(skill: ISkill): Promise<ISkill>;
  findById(id: string): Promise<ISkill | null>;
  findAll(): Promise<ISkill[]>;
  delete(id: string): Promise<void>;
} 