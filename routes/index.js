import express from 'express';
import cors from 'cors';
import userRouter from './user';
import postRouter from './post';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/post', postRouter);

export default router;
