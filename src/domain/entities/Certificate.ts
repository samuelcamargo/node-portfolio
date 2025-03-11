import { ICertificate } from '../interfaces/ICertificate';

export class Certificate implements ICertificate {
  id?: string;
  name: string;
  platform: string;
  date: string;
  url: string;
  category: string;

  constructor(props: Omit<Certificate, 'id'>) {
    Object.assign(this, props);
  }
} 