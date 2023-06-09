import express from 'express';
import logger from './libs/logger';
import router from './routes';
import connectMongo from './libs/connect_mongo';
import './libs/config';
import fileService from './service/file';

const app = express();

// Connect to MongoDB
connectMongo();

// Body Parser (image/jpeg for jpg)
app.use(express.json());
app.use(express.raw({ type: 'application/pdf', limit: '5mb' }));
app.use(express.raw({ type: 'image/png', limit: '10mb' }));

// Router
app.use(router);
app.get('/', async (req, res) => {
  res.json({ message: 'Welcome to MC-Ten-year-Server!' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    fileService.S3Config();
    logger.info(`Server is running at port ${process.env.PORT}`);
  });
}

export default app;
