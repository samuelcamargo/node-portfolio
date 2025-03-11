import { injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { mongoClient } from '@/infra/database';
import { Education } from '@/domain/entities/Education';
import { IEducationRepository } from '@/domain/repositories/IEducationRepository';

@injectable()
export class MongoEducationRepository implements IEducationRepository {
  private get collection() {
    return mongoClient.db('node-portfolio').collection('education');
  }

  async findByTitle(title: string): Promise<Education | null> {
    const education = await this.collection.findOne({ title });
    if (!education) return null;

    return {
      id: education._id.toString(),
      title: education.title,
      institution: education.institution,
      period: education.period
    };
  }

  async save(education: Education): Promise<Education> {
    if (education.id) {
      const id = new ObjectId(education.id);
      const { id: _, ...updateData } = education;
      
      await this.collection.updateOne(
        { _id: id },
        { $set: updateData }
      );

      return education;
    }

    const result = await this.collection.insertOne({
      title: education.title,
      institution: education.institution,
      period: education.period
    });

    return {
      id: result.insertedId.toString(),
      title: education.title,
      institution: education.institution,
      period: education.period
    };
  }

  async findById(id: string): Promise<Education | null> {
    const education = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!education) return null;

    return {
      id: education._id.toString(),
      title: education.title,
      institution: education.institution,
      period: education.period
    };
  }

  async findAll(): Promise<Education[]> {
    const educations = await this.collection.find().toArray();
    
    return educations.map(education => ({
      id: education._id.toString(),
      title: education.title,
      institution: education.institution,
      period: education.period
    }));
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    });
  }
} 