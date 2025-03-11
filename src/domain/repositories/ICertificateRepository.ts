import { ICertificate } from '../interfaces/ICertificate';

export interface ICertificateRepository {
  findByNameAndPlatform(name: string, platform: string): Promise<ICertificate | null>;
  save(certificate: ICertificate): Promise<ICertificate>;
  findById(id: string): Promise<ICertificate | null>;
  findAll(): Promise<ICertificate[]>;
  findByCategory(category: string): Promise<ICertificate[]>;
  delete(id: string): Promise<void>;
} 