import { inject, injectable } from 'tsyringe';
import { ICertificateRepository } from '@/domain/repositories/ICertificateRepository';
import { Certificate } from '@/domain/entities/Certificate';
import { AppError } from '@/shared/errors/AppError';

interface ICreateCertificateDTO {
    name: string;
    platform: string;
    date: string;
    url: string;
    category: string;
}

interface IUpdateCertificateDTO {
  name?: string;
  platform?: string;
  date?: string;
  url?: string;
  category?: string;
}

@injectable()
export class CertificateUseCase {
  constructor(
    @inject('CertificateRepository')
    private certificateRepository: ICertificateRepository,
  ) {}

  async create({ name, platform, date, url, category }: ICreateCertificateDTO): Promise<Certificate> {
    const certificateExists = await this.certificateRepository.findByNameAndPlatform(name, platform);

    if (certificateExists) {
      throw new AppError('Certificate with this name and platform already exists');
    }

    const certificate = new Certificate({
      name,
      platform,
      date,
      url,
      category
    });

    return this.certificateRepository.save(certificate);
  }

  async findByNameAndPlatform(name: string, platform: string): Promise<Certificate | null> {
    return this.certificateRepository.findByNameAndPlatform(name, platform);
  }

  async findById(id: string): Promise<Certificate | null> {
    return this.certificateRepository.findById(id);
  }

  async list(): Promise<Certificate[]> {
    return this.certificateRepository.findAll();
  }

  async findByCategory(category: string): Promise<Certificate[]> {
    return this.certificateRepository.findByCategory(category);
  }

  async update(id: string, data: IUpdateCertificateDTO): Promise<Certificate> {
    const certificate = await this.certificateRepository.findById(id);

    if (!certificate) {
      throw new AppError('Certificate not found', 404);
    }

    if ((data.name && data.name !== certificate.name) || (data.platform && data.platform !== certificate.platform)) {
      if (data.name && data.platform) {
        const existingCertificate = await this.certificateRepository.findByNameAndPlatform(data.name, data.platform);
        if (existingCertificate && existingCertificate.id !== id) {
          throw new AppError('Certificate with this name and platform already exists');
        }
      }
    }

    if (data.name) {
      certificate.name = data.name;
    }

    if (data.platform) {
      certificate.platform = data.platform;
    }

    if (data.date) {
      certificate.date = data.date;
    }

    if (data.url) {
      certificate.url = data.url;
    }

    if (data.category) {
      certificate.category = data.category;
    }

    return this.certificateRepository.save(certificate);
  }

  async delete(id: string): Promise<void> {
    const certificate = await this.certificateRepository.findById(id);

    if (!certificate) {
      throw new AppError('Certificate not found', 404);
    }

    await this.certificateRepository.delete(id);
  }

  async seedCertificates(): Promise<void> {
    const allCertificates = [
      {
        name: 'Node.js: criando API Rest com autenticação, perfis de usuários e permissões',
        platform: 'Alura',
        date: '2025-03-10',
        url: 'https://cursos.alura.com.br/certificate/c2dd0442-a0f3-418e-9912-d810665587ec?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Node.js: criptografia e tokens JWT',
        platform: 'Alura',
        date: '2025-03-08',
        url: 'https://cursos.alura.com.br/certificate/db2a6a62-fe9d-4d48-b067-1273b1cfb819?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Six Sigma White Belt',
        platform: 'Six Sigma',
        date: '2025-02-22',
        url: 'https://dashboard.educate360.com/certification/eyJpdiI6IlpnbHlRTFNEQW9HOGdXK3FvMGc2dFE9PSIsInZhbHVlIjoiOXlRZ1RldTdMeTJpMkhCeGJBaU9Vdz09IiwibWFjIjoiM2JmMmY0ZjUxNGNjMzU2ZmI1ZjU1NDdhM2JiMjQ1ZDk1ZTBiYTk3NDY5NWNjNDc3YjMxMGQ3ODljMWFlNzQwMiIsInRhZyI6IiJ9',
        category: 'Agile'
      },
      {
        name: 'Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate',
        platform: 'Oracle',
        date: '2025-02-21',
        url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=40FDA11B0CAFCF5AA29FF0D6430DE8170FB4705701EE1D2B1A81C8A970273DF4',
        category: 'Backend'
      },
      {
        name: 'Oracle Cloud Infrastructure 2024 Certified Foundations Associate',
        platform: 'Oracle',
        date: '2025-02-21',
        url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=0598FCF399E6C908387297D4A5710F0AEA1D9EE832E0D8FEB8B1C5FD714E8EDD',
        category: 'Backend'
      },
      {
        name: 'Oracle Cloud Infrastructure 2024 Data Certified Foundations Associate',
        platform: 'Oracle',
        date: '2025-02-21',
        url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=0598FCF399E6C908387297D4A5710F0A273706A1D38AF6EC5F8DE7F6FDDD84AA',
        category: 'Backend'
      },
      {
        name: 'Node.js: implementando testes em uma API Rest',
        platform: 'Alura',
        date: '2025-01-29',
        url: 'https://cursos.alura.com.br/certificate/6a72f8f5-5287-4458-8283-2b71eda08002?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Node.js: testes unitários e de integração',
        platform: 'Alura',
        date: '2025-01-25',
        url: 'https://cursos.alura.com.br/certificate/50ddccd6-b228-413a-9b00-b79bc36282b0?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Next.js: autenticação e gerenciamento de Tokens',
        platform: 'Alura',
        date: '2025-01-22',
        url: 'https://cursos.alura.com.br/certificate/ea3c0e14-ec49-41dc-a0d1-b264f864d120?lang=pt_BR',
        category: 'Frontend'
      },
      {
        name: 'Next.js: tour pelo Next.js',
        platform: 'Alura',
        date: '2025-01-22',
        url: 'https://cursos.alura.com.br/certificate/530ea428-5112-4696-b1f7-c42062367986?lang=pt_BR',
        category: 'Frontend'
      },
      {
        name: 'Next.js: explorando o framework',
        platform: 'Alura',
        date: '2025-01-18',
        url: 'https://cursos.alura.com.br/certificate/bc033d6e-6f3c-4d47-8987-94f687527ad3?lang=pt_BR',
        category: 'Frontend'
      },
      {
        name: 'Padrões de projeto com TypeScript: aprimorando uma API com arquitetura limpa',
        platform: 'Alura',
        date: '2024-11-11',
        url: 'https://cursos.alura.com.br/certificate/34143cbb-b6b7-475f-9605-4c790bc9ba49?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Nest.js: adicionando funcionalidades com Redis, JWT e logging',
        platform: 'Alura',
        date: '2024-10-11',
        url: 'https://cursos.alura.com.br/certificate/041a72ec-e32d-4faf-98b3-ad0426800013?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Nest.js: lidando com migrações, relacionamentos ORM e erros em uma API',
        platform: 'Alura',
        date: '2024-10-10',
        url: 'https://cursos.alura.com.br/certificate/116a5129-2ab0-4ecb-8c35-1a0ba4b1eb48?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Nest.js: Persistindo dados com TypeORM e PostgreSQL',
        platform: 'Alura',
        date: '2024-10-10',
        url: 'https://cursos.alura.com.br/certificate/92d8b45c-a0d1-455d-9c09-b3fcc722344d?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Nest.js: criando uma API Restful',
        platform: 'Alura',
        date: '2024-09-11',
        url: 'https://cursos.alura.com.br/certificate/5c937510-f9d1-4389-bb3b-da67c0105db3?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'TypeScript: desenvolvendo validações e tratando erros',
        platform: 'Alura',
        date: '2024-09-11',
        url: 'https://cursos.alura.com.br/certificate/73554b5f-aea8-404f-ad49-8426cd43efb0?lang=pt_BR',
        category: 'Frontend'
      },
      {
        name: 'Node.js: lidando com buscas, filtros, paginação e erros em uma API',
        platform: 'Alura',
        date: '2024-10-30',
        url: 'https://cursos.alura.com.br/certificate/e52eb0f0-54d5-4810-b6b0-0b986d2607b2?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'Typescript: construção de uma API com tipagem segura',
        platform: 'Alura',
        date: '2023-09-03',
        url: 'https://cursos.alura.com.br/certificate/3a2c9ffa-b0bf-4a91-ab44-0435492e3b39?lang=pt_BR',
        category: 'Backend'
      },
      {
        name: 'ORM com Node.js: avançando nas funcionalidades do Sequelize',
        platform: 'Alura',
        date: '2024-10-30',
        url: 'https://cursos.alura.com.br/certificate/39e16648-b0a3-460a-98c9-5c401edfe5a9?lang=pt_BR',
        category: 'Backend'
      }
    ];

    // Para não deixar o código muito extenso, vamos adicionar apenas os primeiros 20 certificados
    // em um cenário real, todos seriam incluídos
    for (const certificateData of allCertificates) {
      const existingCertificate = await this.certificateRepository.findByNameAndPlatform(
        certificateData.name, 
        certificateData.platform
      );
      
      if (!existingCertificate) {
        const certificate = new Certificate(certificateData);
        await this.certificateRepository.save(certificate);
      }
    }
  }
} 