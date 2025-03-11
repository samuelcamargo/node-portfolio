import { Router } from 'express';
import { ExperienceController } from '../controllers/ExperienceController';
import { authMiddleware } from '../middlewares/authMiddleware';

const experienceRoutes = Router();
const experienceController = new ExperienceController();

/**
 * @swagger
 * /experiences:
 *   post:
 *     tags:
 *       - Experiências
 *     summary: Criar nova experiência profissional
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - company
 *               - period
 *               - description
 *             properties:
 *               role:
 *                 type: string
 *                 example: "Gerente de TI"
 *               company:
 *                 type: string
 *                 example: "Campsoft"
 *               period:
 *                 type: string
 *                 example: "agosto de 2023 - Presente"
 *               description:
 *                 type: string
 *                 example: "Liderança de equipes técnicas, gestão de projetos com metodologias ágeis"
 *     responses:
 *       201:
 *         description: Experiência criada com sucesso
 */
experienceRoutes.post('/', authMiddleware, experienceController.create);

/**
 * @swagger
 * /experiences:
 *   get:
 *     tags:
 *       - Experiências
 *     summary: Listar todas as experiências profissionais
 *     responses:
 *       200:
 *         description: Lista de experiências profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   role:
 *                     type: string
 *                   company:
 *                     type: string
 *                   period:
 *                     type: string
 *                   description:
 *                     type: string
 */
experienceRoutes.get('/', experienceController.list);

/**
 * @swagger
 * /experiences/seed:
 *   post:
 *     tags:
 *       - Experiências
 *     summary: Semear experiências profissionais no banco de dados
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Experiências semeadas com sucesso
 */
experienceRoutes.post('/seed', authMiddleware, experienceController.seed);

/**
 * @swagger
 * /experiences/{id}:
 *   get:
 *     tags:
 *       - Experiências
 *     summary: Buscar experiência profissional por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da experiência profissional
 *     responses:
 *       200:
 *         description: Experiência encontrada
 *       404:
 *         description: Experiência não encontrada
 */
experienceRoutes.get('/:id', experienceController.findById);

/**
 * @swagger
 * /experiences/{id}:
 *   put:
 *     tags:
 *       - Experiências
 *     summary: Atualizar experiência profissional
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da experiência profissional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               company:
 *                 type: string
 *               period:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Experiência atualizada
 *       404:
 *         description: Experiência não encontrada
 */
experienceRoutes.put('/:id', authMiddleware, experienceController.update);

/**
 * @swagger
 * /experiences/{id}:
 *   delete:
 *     tags:
 *       - Experiências
 *     summary: Excluir experiência profissional
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da experiência profissional
 *     responses:
 *       204:
 *         description: Experiência excluída com sucesso
 *       404:
 *         description: Experiência não encontrada
 */
experienceRoutes.delete('/:id', authMiddleware, experienceController.delete);

export { experienceRoutes }; 