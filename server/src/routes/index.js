import { Router } from 'express';
import userRoutes from './user.routes.js';

const router = Router();

router.use('/modelo', userRoutes);

export default router;
