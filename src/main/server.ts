import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { router } from '../infra/http/routes';
import { swaggerSpec } from '@/config/swagger';
import { initializeDatabase } from '@/infra/database';
import { errorMiddleware } from '@/infra/http/middlewares/errorMiddleware';

// Importa o container de injeção de dependência
import '@/shared/container';

// Adicionar os handlers de erro no início
process.on('unhandledRejection', (error: Error) => {
  console.error('🚨 Unhandled Rejection:', error);
});

process.on('uncaughtException', (error: Error) => {
  console.error('🚨 Uncaught Exception:', error);
  process.exit(1);
});

const app: Express = express();

// Configuração do CORS
app.use(cors({
  origin: '*', // Em produção, configure apenas as origens permitidas
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Configuração do Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 2,
      docExpansion: 'list',
    },
  })
);

app.use(router);

// Middleware de erro deve ser o último
app.use(errorMiddleware);

const port = process.env.PORT || 3000; // Adicionando fallback para a porta

const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();
    
    app.listen(port, () => {
      console.log(`
🚀 Servidor rodando!

📡 Local: http://localhost:${port}
📚 Documentação: http://localhost:${port}/api-docs

✅ Banco de dados conectado
      `);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1); // Encerra o processo em caso de erro
  }
};

startServer(); 