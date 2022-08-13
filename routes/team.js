import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const teamRouter = express.Router();
teamRouter.post('/addTeam', auth(true), controller.team.addTeam);
teamRouter.post('/getTeam', auth(true), controller.team.getTeam);
teamRouter.post('/getTeams', auth(true), controller.team.getTeams);
teamRouter.post('/modifyTeam', auth(true), controller.team.modifyTeam);
teamRouter.post('/removeTeam', auth(true), controller.team.removeTeam);
teamRouter.post('/removeTeams', auth(true), controller.team.removeTeams);

export default teamRouter;
