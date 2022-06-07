import path from 'path';
import google from '@googleapis/forms';
// import { authenticate } from '@google-cloud/local-auth';

const formID = '1dWCqmthEMLuhH-_226gjYLr-XTgTmeGT5pM8Q74VqZ0';
const __dirname = process.cwd();

async function getData() {
  // const auth = await authenticate({
  //   keyfilePath: path.join(__dirname, '/libs/credentials.json'),
  //   scopes: 'https://www.googleapis.com/auth/forms.responses.readonly'
  // });

  const auth = new google.auth.GoogleAuth({
    keyFilename: path.join(__dirname, '/credentials.json'),
    scopes: [
      'https://www.googleapis.com/auth/script.external_request',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/forms.body',
      'https://www.googleapis.com/auth/forms.body.readonly',
      'https://www.googleapis.com/auth/forms.responses.readonly'
    ]
  });

  const authClient = await auth.getClient();

  const forms = google.forms({
    version: 'v1',
    auth: authClient
  });

  // the response from google form
  const res = await forms.forms.responses.list({ formId: formID });
  const ans = res.data.responses;

  // retrieve the response
  ans.forEach((x) => {
    const value = Object.values(x.answers);
    for (let i = 0; i < value.length; i += 1) {
      console.log(value[i]);
    }
  });

  return res.data;
}

export default getData;
