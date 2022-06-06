import express from 'express';
import cors from 'cors';

import userRouter from './user';
import fileRouter from './file';
import postRouter from './post';
import teamRouter from './team';
import questionRouter from './question';
import competitorRouter from './competitor';
import memoryRouter from './memory';
import staffRouter from './staff';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/file', fileRouter);
router.use('/team', teamRouter);
router.use('/question', questionRouter);
router.use('/competitor', competitorRouter);
router.use('/memory', memoryRouter);
router.use('/Staff', staffRouter);

export default router;
