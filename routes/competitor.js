import express from 'express';
import controller from '../controller';
//import auth from '../middleware/auth';

const competitorRouter = express.Router();

competitorRouter.post('/addCompetitor', controller.competitor.addCompetitor);
competitorRouter.post('/getCompetitor', controller.competitor.getCompetitor);
competitorRouter.post('/getCompetitors', controller.competitor.getCompetitors);
competitorRouter.post('/modifyCompetitor', controller.competitor.modifyCompetitor);
competitorRouter.post('/removeCompetitor', controller.competitor.removeCompetitor);

export default competitorRouter;
