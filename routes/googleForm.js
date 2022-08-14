import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const googleFormRouter = express.Router();

googleFormRouter.post('/readAllData', auth(true), controller.googleForm.readAllData);
googleFormRouter.post('/reset', auth(true), controller.googleForm.reset);

export default googleFormRouter;
