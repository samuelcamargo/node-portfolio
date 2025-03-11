import { IExperience } from '../interfaces/IExperience';

export class Experience implements IExperience {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;

  constructor(props: Omit<Experience, 'id'>) {
    Object.assign(this, props);
  }
} 