import express from 'express';
import cors from 'cors';

import userRouter from './user';
import questionRouter from './question';

const router = express.Router();

router.use(cors());

router.use('/user', userRouter);
router.use('/question', questionRouter);

export default router;
