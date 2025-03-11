import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CertificateUseCase } from '@/application/useCases/CertificateUseCase';

export class CertificateController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, platform, date, url, category } = request.body;

    const certificateUseCase = container.resolve(CertificateUseCase);
    const certificate = await certificateUseCase.create({
      name,
      platform,
      date,
      url,
      category
    });

    return response.status(201).json(certificate);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const certificateUseCase = container.resolve(CertificateUseCase);
    const certificate = await certificateUseCase.findById(id);

    if (!certificate) {
      return response.status(404).json({ error: 'Certificate not found' });
    }

    return response.json(certificate);
  }

  async list(_request: Request, response: Response): Promise<Response> {
    const certificateUseCase = container.resolve(CertificateUseCase);
    const certificates = await certificateUseCase.list();

    return response.json(certificates);
  }

  async findByCategory(request: Request, response: Response): Promise<Response> {
    const { category } = request.params;

    const certificateUseCase = container.resolve(CertificateUseCase);
    const certificates = await certificateUseCase.findByCategory(category);

    return response.json(certificates);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, platform, date, url, category } = request.body;

    const certificateUseCase = container.resolve(CertificateUseCase);

    const certificate = await certificateUseCase.update(id, {
      name,
      platform,
      date,
      url,
      category
    });

    return response.json(certificate);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const certificateUseCase = container.resolve(CertificateUseCase);
    await certificateUseCase.delete(id);

    return response.status(204).send();
  }

  async seed(_request: Request, response: Response): Promise<Response> {
    const certificateUseCase = container.resolve(CertificateUseCase);
    await certificateUseCase.seedCertificates();

    return response.status(201).json({ message: 'Certificates seeded successfully' });
  }
} 