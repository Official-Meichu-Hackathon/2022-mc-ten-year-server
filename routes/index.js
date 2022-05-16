import express from 'express';
import cors from 'cors';
import userRouter from './user';
import competitorRouter from './competitor';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/competitor', competitorRouter);

export default router;
