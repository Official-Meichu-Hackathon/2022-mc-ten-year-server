import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const competitorRouter = express.Router();

userRouter.post('/addCompetitor', auth(true), controller.competitor.addCompetitor);
userRouter.post('/getCompetitor', controller.competitor.getCompetitor);
userRouter.post('/getCompetitors', controller.competitor.getCompetitors);
userRouter.post('/modifyCompetitor', auth(true), controller.competitor.modifyCompetitor);
userRouter.post('/removeCompetitor', auth(true), controller.competitor.removeCompetitor);

export default competitorRouter;
