import express from 'express';
import cors from 'cors';
import userRouter from './user';
import fileRouter from './file';
import postRouter from './post';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/file', fileRouter);

export default router;
