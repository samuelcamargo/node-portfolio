import { Router } from 'express';
import { CertificateController } from '../controllers/CertificateController';
import { authMiddleware } from '../middlewares/authMiddleware';

const certificateRoutes = Router();
const certificateController = new CertificateController();

/**
 * @swagger
 * /certificates:
 *   post:
 *     tags:
 *       - Certificados
 *     summary: Criar novo certificado
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
 *               - platform
 *               - date
 *               - url
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Node.js: criando API Rest"
 *               platform:
 *                 type: string
 *                 example: "Alura"
 *               date:
 *                 type: string
 *                 example: "2025-03-10"
 *               url:
 *                 type: string
 *                 example: "https://cursos.alura.com.br/certificate/123456"
 *               category:
 *                 type: string
 *                 example: "Backend"
 *     responses:
 *       201:
 *         description: Certificado criado com sucesso
 */
certificateRoutes.post('/', authMiddleware, certificateController.create);

/**
 * @swagger
 * /certificates:
 *   get:
 *     tags:
 *       - Certificados
 *     summary: Listar todos os certificados
 *     responses:
 *       200:
 *         description: Lista de certificados
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
 *                   platform:
 *                     type: string
 *                   date:
 *                     type: string
 *                   url:
 *                     type: string
 *                   category:
 *                     type: string
 */
certificateRoutes.get('/', certificateController.list);

/**
 * @swagger
 * /certificates/category/{category}:
 *   get:
 *     tags:
 *       - Certificados
 *     summary: Buscar certificados por categoria
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: Categoria do certificado
 *     responses:
 *       200:
 *         description: Lista de certificados da categoria
 */
certificateRoutes.get('/category/:category', certificateController.findByCategory);

/**
 * @swagger
 * /certificates/seed:
 *   post:
 *     tags:
 *       - Certificados
 *     summary: Semear certificados no banco de dados
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Certificados semeados com sucesso
 */
certificateRoutes.post('/seed', authMiddleware, certificateController.seed);

/**
 * @swagger
 * /certificates/{id}:
 *   get:
 *     tags:
 *       - Certificados
 *     summary: Buscar certificado por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do certificado
 *     responses:
 *       200:
 *         description: Certificado encontrado
 *       404:
 *         description: Certificado não encontrado
 */
certificateRoutes.get('/:id', certificateController.findById);

/**
 * @swagger
 * /certificates/{id}:
 *   put:
 *     tags:
 *       - Certificados
 *     summary: Atualizar certificado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do certificado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               platform:
 *                 type: string
 *               date:
 *                 type: string
 *               url:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Certificado atualizado
 *       404:
 *         description: Certificado não encontrado
 */
certificateRoutes.put('/:id', authMiddleware, certificateController.update);

/**
 * @swagger
 * /certificates/{id}:
 *   delete:
 *     tags:
 *       - Certificados
 *     summary: Excluir certificado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do certificado
 *     responses:
 *       204:
 *         description: Certificado excluído com sucesso
 *       404:
 *         description: Certificado não encontrado
 */
certificateRoutes.delete('/:id', authMiddleware, certificateController.delete);

export { certificateRoutes }; 