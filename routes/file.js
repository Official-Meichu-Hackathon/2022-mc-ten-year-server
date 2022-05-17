import express from 'express';
import controller from '../controller';

const fileRouter = express.Router();

fileRouter.post('/addFile', controller.file.addFile);
fileRouter.post('/getFile', controller.file.getFile);
fileRouter.post('/removeFile', controller.file.removeFile);

export default fileRouter;
