import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const questionRouter = express.Router();

questionRouter.post('/addQuestion', auth(true), controller.question.addQuestion);
questionRouter.post('/getQuestion', controller.question.getQuestion);
questionRouter.post('/getQuestions', controller.question.getQuestions);
questionRouter.post('/modifyQuestion', auth(true), controller.question.modifyQuestion);
questionRouter.post('/removeQuestion', auth(true), controller.question.removeQuestion);
questionRouter.post('/removeQuestions', auth(true), controller.question.removeQuestions);

export default questionRouter;
