import 'reflect-metadata';
import '../shared/container';
import { EducationUseCase } from '@/application/useCases/EducationUseCase';
import { container } from 'tsyringe';
import { mongoClient } from '@/infra/database';

async function seedEducation() {
  try {
    await mongoClient.connect();
    console.log('MongoDB connected successfully');

    const educationUseCase = container.resolve(EducationUseCase);
    await educationUseCase.seedEducation();
    
    console.log('Education records seeded successfully');
  } catch (error) {
    console.error('Error seeding education records:', error);
  } finally {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
}

seedEducation(); 