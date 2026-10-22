import { Router } from 'express';
import brokersRoutes from './brokers.routes.js';
import employeesRoutes from './employees.routes.js';
import providersRoutes from './providers.routes.js';
import policiesRoutes from './policies.routes.js';
import enrollmentsRoutes from './enrollments.routes.js';

const router = Router();

router.use('/brokers', brokersRoutes);
router.use('/employees', employeesRoutes);
router.use('/providers', providersRoutes);
router.use('/policies', policiesRoutes);
router.use('/enrollments', enrollmentsRoutes);

export default router;
