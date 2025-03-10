import { mongoClient } from '../index';

export async function createIndexes() {
  const db = mongoClient.db('node-portfolio');

  // Índices
  await db.collection('users').createIndex(
    { username: 1 }, 
    { unique: true }
  );

  // Outros índices necessários...
} 