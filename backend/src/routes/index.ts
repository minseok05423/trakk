import express from 'express';
import runRoutes from './run.routes';
import healthRoutes from './health.routes';

const router = express.Router();

router.use('/runs', runRoutes);
router.use('/health', healthRoutes);

export default router;
