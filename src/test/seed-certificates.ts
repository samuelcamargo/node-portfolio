import 'reflect-metadata';
import '../shared/container';
import { CertificateUseCase } from '@/application/useCases/CertificateUseCase';
import { container } from 'tsyringe';
import { mongoClient } from '@/infra/database';

async function seedCertificates() {
  try {
    await mongoClient.connect();
    console.log('MongoDB connected successfully');

    const certificateUseCase = container.resolve(CertificateUseCase);
    await certificateUseCase.seedCertificates();
    
    console.log('Certificates seeded successfully');
  } catch (error) {
    console.error('Error seeding certificates:', error);
  } finally {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
}

seedCertificates(); 