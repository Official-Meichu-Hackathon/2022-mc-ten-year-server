import express from 'express';
import controller from '../controller';
import auth from '../middleware/auth';

const postRouter = express.Router();

postRouter.post('/addPost', auth(true), controller.post.addPost);
postRouter.post('/getPost', auth(true), controller.post.getPost);
postRouter.post('/getPosts', auth(true), controller.post.getPosts);
postRouter.post('/modifyPost', auth(true), controller.post.modifyPost);
postRouter.post('/removePost', auth(true), controller.post.removePost);
postRouter.post('/removePosts', auth(true), controller.post.removePosts);

export default postRouter;
