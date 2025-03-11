import { injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { mongoClient } from '@/infra/database';
import { Skill } from '@/domain/entities/Skill';
import { ISkillRepository } from '@/domain/repositories/ISkillRepository';

@injectable()
export class MongoSkillRepository implements ISkillRepository {
  private get collection() {
    return mongoClient.db('node-portfolio').collection('skills');
  }

  async findByName(name: string): Promise<Skill | null> {
    const skill = await this.collection.findOne({ name });
    if (!skill) return null;

    return {
      id: skill._id.toString(),
      name: skill.name,
      level: skill.level,
      category: skill.category
    };
  }

  async save(skill: Skill): Promise<Skill> {
    if (skill.id) {
      const id = new ObjectId(skill.id);
      const { id: _, ...updateData } = skill;
      
      await this.collection.updateOne(
        { _id: id },
        { $set: updateData }
      );

      return skill;
    }

    const result = await this.collection.insertOne({
      name: skill.name,
      level: skill.level,
      category: skill.category
    });

    return {
      id: result.insertedId.toString(),
      name: skill.name,
      level: skill.level,
      category: skill.category
    };
  }

  async findById(id: string): Promise<Skill | null> {
    const skill = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!skill) return null;

    return {
      id: skill._id.toString(),
      name: skill.name,
      level: skill.level,
      category: skill.category
    };
  }

  async findAll(): Promise<Skill[]> {
    const skills = await this.collection.find().toArray();
    
    return skills.map(skill => ({
      id: skill._id.toString(),
      name: skill.name,
      level: skill.level,
      category: skill.category
    }));
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    });
  }
} 