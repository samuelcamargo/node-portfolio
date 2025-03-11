import 'reflect-metadata';
import '../shared/container';
import { SkillUseCase } from '@/application/useCases/SkillUseCase';
import { container } from 'tsyringe';
import { mongoClient } from '@/infra/database';

async function seedSkills() {
  try {
    await mongoClient.connect();
    console.log('MongoDB connected successfully');

    const skillUseCase = container.resolve(SkillUseCase);
    await skillUseCase.seedSkills();
    
    console.log('Skills seeded successfully');
  } catch (error) {
    console.error('Error seeding skills:', error);
  } finally {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
}

seedSkills(); 