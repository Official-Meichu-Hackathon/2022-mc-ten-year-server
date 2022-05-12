import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const teamRouter = express.Router();
teamRouter.post('/addTeam', controller.team.addTeam);
teamRouter.post('/getTeam', auth(true), controller.team.getTeam);
teamRouter.post('/getTeams', auth(true), controller.team.getTeams);
teamRouter.post('/modifyTeam', auth(), controller.team.modifyTeam);
teamRouter.post('/removeTeam', auth(true), controller.team.removeTeam);

export default teamRouter;
