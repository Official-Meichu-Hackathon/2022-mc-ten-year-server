import express from 'express';
import logger from './libs/logger';
import router from './routes';
import connectMongo from './libs/connect_mongo';
import './libs/config';

const app = express();

// Connect to MongoDB
connectMongo();

// Body Parser
app.use(express.json());

// Router
app.use(router);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MC-Ten-year-Server!' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    logger.info(`Server is running at port ${process.env.PORT}`);
  });
}

export default app;
