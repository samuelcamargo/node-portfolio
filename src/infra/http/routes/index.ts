import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authRoutes } from './auth.routes';
import { userRoutes } from './user.routes';
import { skillRoutes } from './skill.routes';
import { languageRoutes } from './language.routes';
import { educationRoutes } from './education.routes';
import { experienceRoutes } from './experience.routes';
import { certificateRoutes } from './certificate.routes';
import { dashboardRoutes } from './dashboard.routes';

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

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/skills', skillRoutes);
router.use('/languages', languageRoutes);
router.use('/education', educationRoutes);
router.use('/experiences', experienceRoutes);
router.use('/certificates', certificateRoutes);
router.use('/dashboard', dashboardRoutes);

export { router }; 