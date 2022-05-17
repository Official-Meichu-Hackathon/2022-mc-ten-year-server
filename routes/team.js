import express from 'express';
import controller from '../controller';
// import auth from '../middleware/auth';

const teamRouter = express.Router();
teamRouter.post('/addTeam', controller.team.addTeam);
teamRouter.post('/getTeam', controller.team.getTeam);
teamRouter.post('/getTeams', controller.team.getTeams);
teamRouter.post('/modifyTeam', controller.team.modifyTeam);
teamRouter.post('/removeTeam', controller.team.removeTeam);

export default teamRouter;
