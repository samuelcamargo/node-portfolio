import { injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { mongoClient } from '@/infra/database';
import { Certificate } from '@/domain/entities/Certificate';
import { ICertificateRepository } from '@/domain/repositories/ICertificateRepository';

@injectable()
export class MongoCertificateRepository implements ICertificateRepository {
  private get collection() {
    return mongoClient.db('node-portfolio').collection('certificates');
  }

  async findByNameAndPlatform(name: string, platform: string): Promise<Certificate | null> {
    const certificate = await this.collection.findOne({ name, platform });
    if (!certificate) return null;

    return {
      id: certificate._id.toString(),
      name: certificate.name,
      platform: certificate.platform,
      date: certificate.date,
      url: certificate.url,
      category: certificate.category
    };
  }

  async save(certificate: Certificate): Promise<Certificate> {
    if (certificate.id) {
      const id = new ObjectId(certificate.id);
      const { id: _, ...updateData } = certificate;
      
      await this.collection.updateOne(
        { _id: id },
        { $set: updateData }
      );

      return certificate;
    }

    const result = await this.collection.insertOne({
      name: certificate.name,
      platform: certificate.platform,
      date: certificate.date,
      url: certificate.url,
      category: certificate.category
    });

    return {
      id: result.insertedId.toString(),
      name: certificate.name,
      platform: certificate.platform,
      date: certificate.date,
      url: certificate.url,
      category: certificate.category
    };
  }

  async findById(id: string): Promise<Certificate | null> {
    const certificate = await this.collection.findOne({ 
      _id: new ObjectId(id) 
    });

    if (!certificate) return null;

    return {
      id: certificate._id.toString(),
      name: certificate.name,
      platform: certificate.platform,
      date: certificate.date,
      url: certificate.url,
      category: certificate.category
    };
  }

  async findAll(): Promise<Certificate[]> {
    const certificates = await this.collection.find().toArray();
    
    return certificates.map(certificate => ({
      id: certificate._id.toString(),
      name: certificate.name,
      platform: certificate.platform,
      date: certificate.date,
      url: certificate.url,
      category: certificate.category
    }));
  }

  async findByCategory(category: string): Promise<Certificate[]> {
    const certificates = await this.collection.find({ category }).toArray();
    
    return certificates.map(certificate => ({
      id: certificate._id.toString(),
      name: certificate.name,
      platform: certificate.platform,
      date: certificate.date,
      url: certificate.url,
      category: certificate.category
    }));
  }

  async delete(id: string): Promise<void> {
    await this.collection.deleteOne({ 
      _id: new ObjectId(id) 
    });
  }
} 