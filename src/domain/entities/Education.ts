import { IEducation } from '../interfaces/IEducation';

export class Education implements IEducation {
  id?: string;
  title: string;
  institution: string;
  period: string;

  constructor(props: Omit<Education, 'id'>) {
    Object.assign(this, props);
  }
} 