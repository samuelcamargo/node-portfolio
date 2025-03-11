import { ISkill } from '../interfaces/ISkill';

export class Skill implements ISkill {
  id?: string;
  name: string;
  level: string;
  category: string;

  constructor(props: Omit<Skill, 'id'>) {
    Object.assign(this, props);
  }
} 