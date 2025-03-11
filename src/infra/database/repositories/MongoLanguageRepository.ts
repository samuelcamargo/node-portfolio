import { injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { mongoClient } from '@/infra/database';
import { Language } from '@/domain/entities/Language';
import { ILanguageRepository } from '@/domain/repositories/ILanguageRepository';

@injectable()
export class MongoLanguageRepository implements ILanguageRepository {
  private get collection() {
    return mongoClient.db('node-portfolio').collection('languages');
  }

  async findByName(name: string): Promise<Language | null> {
    const language = await this.collection.findOne({ name });
    if (!language) return null;

    return {
      id: language._id.toString(),
      name: language.name,
      level: language.level
    };
  }

  async save(language: Language): Promise<Language> {
    if (language.id) {
      const id = new ObjectId(language.id);
      const { id: _, ...updateData } = language;
      
      await this.collection.updateOne(
        { _id: id },
        { $set: updateData }
      );

      return language;
    }

    const result = await this.collection.insertOne({
      name: language.name,
      level: language.level
    });

    return {
      id: result.insertedId.toString(),
      name: language.name,
      level: language.level
    };
  }

  async findById(id: string): Promise<Language | null> {
    const language = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!language) return null;

    return {
      id: language._id.toString(),
      name: language.name,
      level: language.level
    };
  }

  async findAll(): Promise<Language[]> {
    const languages = await this.collection.find().toArray();
    
    return languages.map(language => ({
      id: language._id.toString(),
      name: language.name,
      level: language.level
    }));
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    });
  }
} 