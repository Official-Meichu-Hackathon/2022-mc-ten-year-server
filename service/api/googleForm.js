import { google } from 'googleapis';

const spreadsheetId = '1f4xbdBe3P5e0MA5T-F8wqRGgDR9UCQ_QkYm08ewd-Ek';

const googleFormService = {
  async readAllData(num) {
    try {
      const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
      });

      // create client instance for auth
      const client = await auth.getClient();

      // instance of Google Sheet API
      const googleSheets = google.sheets({
        version: 'v4',
        auth: client
      });

      // get Rows
      const result = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        majorDimension: 'ROWS',
        range: `Sheet1!${num}:${num}`
      });

      // remove the first row of the sheet
      // result.data.values.shift();

      return { dataSet: result.data.values.length, data: result.data.values };
    } catch (error) {
      logger.error('[GoogleForm Service] Failed to read all data to database:', error);
      throw new Error(`Failed to read data from googleForm, ${error}`);
    }
  }
};

export default googleFormService;
