import { google } from 'googleapis';
import logger from '../../libs/logger';

const googleFormService = {
  async uploadFile(fileId, mimeType) {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/drive'
      });

      // create client instance for auth
      const client = await auth.getClient();

      // instance of Google Sheet API
      const googleDrive = google.drive({
        version: 'v3',
        auth: client
      });
      const result = googleDrive.files.get({
        fileId,
        alt: 'media',
        mimeType
      }, {
        // Make sure we get the binary data
        responseType: 'stream'
      });

      return result;
    } catch (error) {
      logger.error('[GoogleDrive Service] Failed to read all data to database:', error);
      throw new Error(`Failed to read data from googleDrive, ${error}`);
    }
  }
};

export default googleFormService;
