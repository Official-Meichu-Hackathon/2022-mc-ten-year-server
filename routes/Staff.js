import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const staffRouter = express.Router();

staffRouter.post('/addStaff', controller.staff.addStaff);
staffRouter.post('/getStaff', auth(true), controller.staff.getStaff);
staffRouter.post('/getStaffs', auth(true), controller.staff.getStaffs);
staffRouter.post('/modifyStaff', auth(), controller.staff.modifyStaff);
staffRouter.post('/removeStaff', auth(true), controller.staff.removeStaff);
staffRouter.post('/removeStaffs', auth(true), controller.staff.removeStaffs);

export default staffRouter;
