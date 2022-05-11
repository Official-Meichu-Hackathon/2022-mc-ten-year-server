import express from 'express';
import controller from '../controller';
// import auth from '../middleware/auth';

const postRouter = express.Router();

postRouter.post('/addPost', controller.post.addPost);
postRouter.post('/getPost', controller.post.getPost);
postRouter.post('/getPosts', controller.post.getPosts);
postRouter.post('/modifyPost', controller.post.modifyPost);
postRouter.post('/removePost', controller.post.removePost);
postRouter.post('/removePosts', controller.post.removePosts);

export default postRouter;
