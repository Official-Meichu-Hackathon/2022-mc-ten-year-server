import express from 'express';
import { google } from 'googleapis';
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
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });

  // create client instance for auth
  const client = await auth.getClient();

  const spreadsheetId = '1f4xbdBe3P5e0MA5T-F8wqRGgDR9UCQ_QkYm08ewd-Ek';

  // instance of Google Sheet API
  const googleSheets = google.sheets({ version: 'v4', auth: client });

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  // get Rows
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: 'Sheet1'
  });

  res.json({ data: getRows.data, dataSet: getRows.data.values.length - 1 });

  // res.json({ message: 'Welcome to MC-Ten-year-Server!' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    fileService.S3Config();
    logger.info(`Server is running at port ${process.env.PORT}`);
  });
}

export default app;
