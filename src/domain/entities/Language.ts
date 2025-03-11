import { ILanguage } from '../interfaces/ILanguage';

export class Language implements ILanguage {
  id?: string;
  name: string;
  level: string;

  constructor(props: Omit<Language, 'id'>) {
    Object.assign(this, props);
  }
} 