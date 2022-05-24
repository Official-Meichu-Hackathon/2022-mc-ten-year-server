import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const fileRouter = express.Router();

fileRouter.post('/addFile', controller.file.addFile);
fileRouter.post('/getFile', auth(true), controller.file.getFile);
fileRouter.post('/getFiles', auth(true), controller.file.getFiles);
fileRouter.post('/removeFile', auth(true), controller.file.removeFile);

export default fileRouter;
