import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController';
import { authMiddleware } from '../middlewares/authMiddleware';

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

/**
 * @swagger
 * /dashboard/skills/by-category:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter habilidades agrupadas por categoria
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Habilidades agrupadas por categoria
 */
dashboardRoutes.get('/skills/by-category', authMiddleware, dashboardController.getSkillsByCategory);

/**
 * @swagger
 * /dashboard/skills/by-level:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter habilidades agrupadas por nível
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Habilidades agrupadas por nível
 */
dashboardRoutes.get('/skills/by-level', authMiddleware, dashboardController.getSkillsByLevel);

/**
 * @swagger
 * /dashboard/skills/radar-data:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter dados para gráfico radar de habilidades
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados para gráfico radar de habilidades
 */
dashboardRoutes.get('/skills/radar-data', authMiddleware, dashboardController.getSkillsRadarData);

/**
 * @swagger
 * /dashboard/certificates/by-category:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter certificados agrupados por categoria
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Certificados agrupados por categoria
 */
dashboardRoutes.get('/certificates/by-category', authMiddleware, dashboardController.getCertificatesByCategory);

/**
 * @swagger
 * /dashboard/certificates/by-platform:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter certificados agrupados por plataforma
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Certificados agrupados por plataforma
 */
dashboardRoutes.get('/certificates/by-platform', authMiddleware, dashboardController.getCertificatesByPlatform);

/**
 * @swagger
 * /dashboard/certificates/timeline:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter timeline de certificados
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Timeline de certificados
 */
dashboardRoutes.get('/certificates/timeline', authMiddleware, dashboardController.getCertificatesTimeline);

/**
 * @swagger
 * /dashboard/experiences/timeline:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter timeline de experiências profissionais
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Timeline de experiências
 */
dashboardRoutes.get('/experiences/timeline', authMiddleware, dashboardController.getExperienceTimeline);

/**
 * @swagger
 * /dashboard/experiences/by-company:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter experiências agrupadas por empresa
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Experiências agrupadas por empresa
 */
dashboardRoutes.get('/experiences/by-company', authMiddleware, dashboardController.getExperienceByCompany);

/**
 * @swagger
 * /dashboard/education/by-institution:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter formações agrupadas por instituição
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Formações agrupadas por instituição
 */
dashboardRoutes.get('/education/by-institution', authMiddleware, dashboardController.getEducationByInstitution);

/**
 * @swagger
 * /dashboard/education/timeline:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter timeline de formação acadêmica
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Timeline de formação acadêmica
 */
dashboardRoutes.get('/education/timeline', authMiddleware, dashboardController.getEducationTimeline);

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     tags:
 *       - Dashboard
 *     summary: Obter resumo geral para o dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumo geral para o dashboard
 */
dashboardRoutes.get('/summary', authMiddleware, dashboardController.getDashboardSummary);

export { dashboardRoutes }; 