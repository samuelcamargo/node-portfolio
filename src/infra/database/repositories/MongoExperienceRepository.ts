import { injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { mongoClient } from '@/infra/database';
import { Experience } from '@/domain/entities/Experience';
import { IExperienceRepository } from '@/domain/repositories/IExperienceRepository';

@injectable()
export class MongoExperienceRepository implements IExperienceRepository {
  private get collection() {
    return mongoClient.db('node-portfolio').collection('experiences');
  }

  async findByRoleAndCompany(role: string, company: string): Promise<Experience | null> {
    const experience = await this.collection.findOne({ role, company });
    if (!experience) return null;

    return {
      id: experience._id.toString(),
      role: experience.role,
      company: experience.company,
      period: experience.period,
      description: experience.description
    };
  }

  async save(experience: Experience): Promise<Experience> {
    if (experience.id) {
      const id = new ObjectId(experience.id);
      const { id: _, ...updateData } = experience;
      
      await this.collection.updateOne(
        { _id: id },
        { $set: updateData }
      );

      return experience;
    }

    const result = await this.collection.insertOne({
      role: experience.role,
      company: experience.company,
      period: experience.period,
      description: experience.description
    });

    return {
      id: result.insertedId.toString(),
      role: experience.role,
      company: experience.company,
      period: experience.period,
      description: experience.description
    };
  }

  async findById(id: string): Promise<Experience | null> {
    const experience = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!experience) return null;

    return {
      id: experience._id.toString(),
      role: experience.role,
      company: experience.company,
      period: experience.period,
      description: experience.description
    };
  }

  async findAll(): Promise<Experience[]> {
    const experiences = await this.collection.find().toArray();
    
    return experiences.map(experience => ({
      id: experience._id.toString(),
      role: experience.role,
      company: experience.company,
      period: experience.period,
      description: experience.description
    }));
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    });
  }
} 