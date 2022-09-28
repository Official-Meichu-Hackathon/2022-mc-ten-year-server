import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const competitorRouter = express.Router();

competitorRouter.post('/addCompetitor', auth(true), controller.competitor.addCompetitor);
competitorRouter.post('/getCompetitor', auth(true), controller.competitor.getCompetitor);
competitorRouter.post('/getCompetitors', controller.competitor.getCompetitors);
competitorRouter.post('/modifyCompetitor', auth(true), controller.competitor.modifyCompetitor);
competitorRouter.post('/removeCompetitor', auth(true), controller.competitor.removeCompetitor);
competitorRouter.post('/removeCompetitors', auth(true), controller.competitor.removeCompetitors);

export default competitorRouter;
