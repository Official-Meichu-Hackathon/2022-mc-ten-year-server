import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const memoryRouter = express.Router();

memoryRouter.post('/addMemory', auth(true), controller.memory.addMemory);
memoryRouter.post('/getMemory', controller.memory.getMemory);
memoryRouter.post('/getMemories', controller.memory.getMemories);
memoryRouter.post('/modifyMemory', auth(true), controller.memory.modifyMemory);
memoryRouter.post('/removeMemory', auth(true), controller.memory.removeMemory);

export default memoryRouter;
