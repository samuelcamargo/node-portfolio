import 'reflect-metadata';
import '../shared/container';
import { LanguageUseCase } from '@/application/useCases/LanguageUseCase';
import { container } from 'tsyringe';
import { mongoClient } from '@/infra/database';

async function seedLanguages() {
  try {
    await mongoClient.connect();
    console.log('MongoDB connected successfully');

    const languageUseCase = container.resolve(LanguageUseCase);
    await languageUseCase.seedLanguages();
    
    console.log('Languages seeded successfully');
  } catch (error) {
    console.error('Error seeding languages:', error);
  } finally {
    await mongoClient.close();
    console.log('MongoDB connection closed');
  }
}

seedLanguages(); 