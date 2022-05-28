import express from 'express';
import cors from 'cors';
import userRouter from './user';
import fileRouter from './file';
import postRouter from './post';
import teamRouter from './team';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/file', fileRouter);
router.use('/team', teamRouter);

export default router;
