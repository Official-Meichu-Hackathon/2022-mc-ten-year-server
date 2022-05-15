import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const questionRouter = express.Router();

questionRouter.post('addQuestion', auth(), controller.question.addQuestion);
questionRouter.post('getQuestion', controller.question.getQuestion);
questionRouter.post('getQuestions', controller.question.getQuestions);
questionRouter.post('modifyQuestion', auth(), controller.question.modifyQuestion);
questionRouter.post('removeQuestion', auth(), controller.question.removeQuestion);

export default questionRouter;
