import 'reflect-metadata';
import '../shared/container';
import { ExperienceUseCase } from '@/application/useCases/ExperienceUseCase';
import { container } from 'tsyringe';
import { mongoClient } from '@/infra/database';

async function seedExperiences() {
  try {
    await mongoClient.connect();
    console.log('MongoDB connected successfully');

    const experienceUseCase = container.resolve(ExperienceUseCase);
    await experienceUseCase.seedExperiences();
    
    console.log('Experiences seeded successfully');
  } catch (error) {
    console.error('Error seeding experiences:', error);
  } finally {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
}

seedExperiences(); 