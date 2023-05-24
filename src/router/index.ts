import express from 'express';
import authRoute from './auth.router';

const router = express.Router();

router.use('/api/auth', authRoute);

export default router;
