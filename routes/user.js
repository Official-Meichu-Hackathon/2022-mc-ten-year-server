import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const userRouter = express.Router();

userRouter.post('/register', controller.user.register);
userRouter.post('/login', controller.user.login);
userRouter.post('/getCurrentUser', auth(), controller.user.getCurrentUser);
userRouter.post('/getUser', auth(true), controller.user.getUser);
userRouter.post('/getUsers', auth(true), controller.user.getUsers);
userRouter.post('/modifyCurrentUser', auth(), controller.user.modifyCurrentUser);
userRouter.post('/modifyUser', auth(true), controller.user.modifyUser);
userRouter.post('/removeUser', auth(true), controller.user.removeUser);
userRouter.post('/removeUsers', controller.user.removeUsers);

export default userRouter;
