import { DataSource } from 'typeorm';
import { User } from '@/domain/entities/User';
import 'dotenv/config';
import bcrypt from 'bcrypt';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './src/database/database.sqlite',
  entities: [User],
  synchronize: true, // Isso vai criar as tabelas automaticamente
  logging: true,
  dropSchema: false // Não vai dropar o schema existente
});

// Inicialização do banco de dados
const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Banco de dados inicializado com sucesso!');
    
    // Criar usuário inicial se não existir
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { username: 'samuelcamargo' } });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      
      await userRepository.save({
        username: 'samuelcamargo',
        password: hashedPassword
      });
      
      console.log('👤 Usuário inicial criado com sucesso!');
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar o banco de dados:', error);
    throw error; // Propaga o erro para ser tratado no servidor
  }
};

export { User, initializeDatabase }; 