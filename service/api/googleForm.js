import path from 'path';
import google from '@googleapis/forms';
import { authenticate } from '@google-cloud/local-auth';

const formID = '1W0ODm8XGNjAxQZtscRila638fEQJZCGBNr8_sqJqZuU';
const __dirname = process.cwd();

async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, '/libs/credentials.json'),
    scopes: 'https://www.googleapis.com/auth/forms.responses.readonly'
  });

  const forms = google.forms({
    version: 'v1',
    auth
  });

  // the response from google form
  const res = await forms.forms.responses.list({ formId: formID });

  return res.data;
}

export default runSample;
