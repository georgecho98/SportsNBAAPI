import express from 'express';
const router = express.Router();
import sportRouter from './sportRouter.js';

router.use('/sport', sportRouter);

export default router;
