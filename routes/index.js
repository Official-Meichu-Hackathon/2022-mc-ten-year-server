import express from 'express';
import cors from 'cors';
import userRouter from './user';
import teamRouter from './team';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/team', teamRouter);

export default router;
