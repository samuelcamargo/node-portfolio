import { Router } from 'express';
import { EducationController } from '../controllers/EducationController';
import { authMiddleware } from '../middlewares/authMiddleware';

const educationRoutes = Router();
const educationController = new EducationController();

/**
 * @swagger
 * /education:
 *   post:
 *     tags:
 *       - Educação
 *     summary: Criar novo registro de educação
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - institution
 *               - period
 *             properties:
 *               title:
 *                 type: string
 *                 example: "MBA em Gestão de Projetos"
 *               institution:
 *                 type: string
 *                 example: "Universidade Anhembi Morumbi"
 *               period:
 *                 type: string
 *                 example: "2023 - 2024"
 *     responses:
 *       201:
 *         description: Registro de educação criado com sucesso
 */
educationRoutes.post('/', authMiddleware, educationController.create);

/**
 * @swagger
 * /education:
 *   get:
 *     tags:
 *       - Educação
 *     summary: Listar todos os registros de educação
 *     responses:
 *       200:
 *         description: Lista de registros de educação
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   institution:
 *                     type: string
 *                   period:
 *                     type: string
 */
educationRoutes.get('/', educationController.list);

/**
 * @swagger
 * /education/seed:
 *   post:
 *     tags:
 *       - Educação
 *     summary: Semear registros de educação no banco de dados
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Registros de educação semeados com sucesso
 */
educationRoutes.post('/seed', authMiddleware, educationController.seed);

/**
 * @swagger
 * /education/{id}:
 *   get:
 *     tags:
 *       - Educação
 *     summary: Buscar registro de educação por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro de educação
 *     responses:
 *       200:
 *         description: Registro de educação encontrado
 *       404:
 *         description: Registro de educação não encontrado
 */
educationRoutes.get('/:id', educationController.findById);

/**
 * @swagger
 * /education/{id}:
 *   put:
 *     tags:
 *       - Educação
 *     summary: Atualizar registro de educação
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro de educação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               institution:
 *                 type: string
 *               period:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro de educação atualizado
 *       404:
 *         description: Registro de educação não encontrado
 */
educationRoutes.put('/:id', authMiddleware, educationController.update);

/**
 * @swagger
 * /education/{id}:
 *   delete:
 *     tags:
 *       - Educação
 *     summary: Excluir registro de educação
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro de educação
 *     responses:
 *       204:
 *         description: Registro de educação excluído com sucesso
 *       404:
 *         description: Registro de educação não encontrado
 */
educationRoutes.delete('/:id', authMiddleware, educationController.delete);

export { educationRoutes }; 