import { MongoClient } from 'mongodb';
import 'dotenv/config';
import bcrypt from 'bcrypt';

// Usando a URI do .env e adicionando o nome do cluster e do banco
const uri = process.env.MONGODB_URI || 'mongodb+srv://samuelcamargo1:E9c6tu9ceQigcwpR@cluster0.mongodb.net/node-portfolio?retryWrites=true&w=majority';

export const mongoClient = new MongoClient(uri, {
  // Opções adicionais de conexão se necessário
});

export async function initializeDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI não está definido nas variáveis de ambiente');
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      ssl: true,
      tls: true,
      tlsAllowInvalidCertificates: false,
      retryWrites: true,
      w: 'majority'
    });

    console.log('✅ MongoDB conectado com sucesso!');

    const db = client.db('node-portfolio');
    
    // Criar índices
    await db.collection('users').createIndex({ username: 1 }, { unique: true });

    // Criar usuário inicial se não existir
    const existingUser = await db.collection('users').findOne({ 
      username: 'samuelcamargo' 
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('123456', 10);

      await db.collection('users').insertOne({
        username: 'samuelcamargo',
        password: hashedPassword
      });

      console.log('👤 Usuário inicial criado com sucesso!');
    }

  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    throw error;
  }
} 