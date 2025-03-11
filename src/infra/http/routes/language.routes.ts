import { Router } from 'express';
import { LanguageController } from '../controllers/LanguageController';
import { authMiddleware } from '../middlewares/authMiddleware';

const languageRoutes = Router();
const languageController = new LanguageController();

/**
 * @swagger
 * /languages:
 *   post:
 *     tags:
 *       - Idiomas
 *     summary: Criar novo idioma
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Português"
 *               level:
 *                 type: string
 *                 example: "Nativo"
 *     responses:
 *       201:
 *         description: Idioma criado com sucesso
 */
languageRoutes.post('/', authMiddleware, languageController.create);

/**
 * @swagger
 * /languages:
 *   get:
 *     tags:
 *       - Idiomas
 *     summary: Listar todos os idiomas
 *     responses:
 *       200:
 *         description: Lista de idiomas
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
 */
languageRoutes.get('/', languageController.list);

/**
 * @swagger
 * /languages/seed:
 *   post:
 *     tags:
 *       - Idiomas
 *     summary: Semear idiomas no banco de dados
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Idiomas semeados com sucesso
 */
languageRoutes.post('/seed', authMiddleware, languageController.seed);

/**
 * @swagger
 * /languages/{id}:
 *   get:
 *     tags:
 *       - Idiomas
 *     summary: Buscar idioma por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do idioma
 *     responses:
 *       200:
 *         description: Idioma encontrado
 *       404:
 *         description: Idioma não encontrado
 */
languageRoutes.get('/:id', languageController.findById);

/**
 * @swagger
 * /languages/{id}:
 *   put:
 *     tags:
 *       - Idiomas
 *     summary: Atualizar idioma
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do idioma
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
 *     responses:
 *       200:
 *         description: Idioma atualizado
 *       404:
 *         description: Idioma não encontrado
 */
languageRoutes.put('/:id', authMiddleware, languageController.update);

/**
 * @swagger
 * /languages/{id}:
 *   delete:
 *     tags:
 *       - Idiomas
 *     summary: Excluir idioma
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do idioma
 *     responses:
 *       204:
 *         description: Idioma excluído com sucesso
 *       404:
 *         description: Idioma não encontrado
 */
languageRoutes.delete('/:id', authMiddleware, languageController.delete);

export { languageRoutes }; 