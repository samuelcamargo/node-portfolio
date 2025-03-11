import { Router } from 'express';
import { SkillController } from '../controllers/SkillController';
import { authMiddleware } from '../middlewares/authMiddleware';

const skillRoutes = Router();
const skillController = new SkillController();

/**
 * @swagger
 * /skills:
 *   post:
 *     tags:
 *       - Habilidades
 *     summary: Criar nova habilidade
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - level
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Node.js"
 *               level:
 *                 type: string
 *                 example: "Avançado"
 *               category:
 *                 type: string
 *                 example: "Backend"
 *     responses:
 *       201:
 *         description: Habilidade criada com sucesso
 */
skillRoutes.post('/', authMiddleware, skillController.create);

/**
 * @swagger
 * /skills:
 *   get:
 *     tags:
 *       - Habilidades
 *     summary: Listar todas as habilidades
 *     responses:
 *       200:
 *         description: Lista de habilidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   level:
 *                     type: string
 *                   category:
 *                     type: string
 */
skillRoutes.get('/', skillController.list);

/**
 * @swagger
 * /skills/seed:
 *   post:
 *     tags:
 *       - Habilidades
 *     summary: Semear habilidades no banco de dados
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Habilidades semeadas com sucesso
 */
skillRoutes.post('/seed', authMiddleware, skillController.seed);

/**
 * @swagger
 * /skills/{id}:
 *   get:
 *     tags:
 *       - Habilidades
 *     summary: Buscar habilidade por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da habilidade
 *     responses:
 *       200:
 *         description: Habilidade encontrada
 *       404:
 *         description: Habilidade não encontrada
 */
skillRoutes.get('/:id', skillController.findById);

/**
 * @swagger
 * /skills/{id}:
 *   put:
 *     tags:
 *       - Habilidades
 *     summary: Atualizar habilidade
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da habilidade
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               level:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Habilidade atualizada
 *       404:
 *         description: Habilidade não encontrada
 */
skillRoutes.put('/:id', authMiddleware, skillController.update);

/**
 * @swagger
 * /skills/{id}:
 *   delete:
 *     tags:
 *       - Habilidades
 *     summary: Excluir habilidade
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da habilidade
 *     responses:
 *       204:
 *         description: Habilidade excluída com sucesso
 *       404:
 *         description: Habilidade não encontrada
 */
skillRoutes.delete('/:id', authMiddleware, skillController.delete);

export { skillRoutes }; 