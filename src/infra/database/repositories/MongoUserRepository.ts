import { injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { mongoClient } from '@/infra/database';
import { User } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';

@injectable()
export class MongoUserRepository implements IUserRepository {
  private get collection() {
    return mongoClient.db('node-portfolio').collection('users');
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.collection.findOne({ username });
    if (!user) return null;

    return {
      id: user._id.toString(),
      username: user.username,
      password: user.password
    };
  }

  async save(user: User): Promise<User> {
    if (user.id) {
      const id = new ObjectId(user.id);
      const { id: _, ...updateData } = user;
      
      await this.collection.updateOne(
        { _id: id },
        { $set: updateData }
      );

      return user;
    }

    const result = await this.collection.insertOne({
      username: user.username,
      password: user.password
    });

    return {
      id: result.insertedId.toString(),
      username: user.username,
      password: user.password
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!user) return null;

    return {
      id: user._id.toString(),
      username: user.username,
      password: user.password
    };
  }

  async findAll(): Promise<User[]> {
    const users = await this.collection.find().toArray();
    
    return users.map(user => ({
      id: user._id.toString(),
      username: user.username,
      password: user.password
    }));
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    });
  }
} 