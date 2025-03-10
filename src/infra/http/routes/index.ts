import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Autenticar usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: samuelcamargo
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 expire_in:
 *                   type: number
 */
router.post('/auth', authController.authenticate);

/**
 * @swagger
 * /sobre:
 *   get:
 *     tags:
 *       - Rotas Protegidas
 *     summary: Rota protegida
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ok
 */
router.get('/sobre', authMiddleware, (_request, response) => {
  return response.status(200).json({ message: 'ok' });
});

export { router }; 