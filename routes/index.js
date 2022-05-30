import express from 'express';
import cors from 'cors';

import userRouter from './user';
import fileRouter from './file';
import postRouter from './post';
import teamRouter from './team';
import questionRouter from './question';
import competitorRouter from './competitor';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/file', fileRouter);
router.use('/team', teamRouter);
router.use('/question', questionRouter);
router.use('/competitor', competitorRouter);

export default router;
