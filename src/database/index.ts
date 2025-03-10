import { DataSource } from 'typeorm';
import { User } from '@/domain/entities/User';
import 'dotenv/config';
import bcrypt from 'bcrypt';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH,
  entities: [User],
  synchronize: true, // Em produção, use migrations ao invés de synchronize
  logging: true
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
  }
};

initializeDatabase();

export { User }; 