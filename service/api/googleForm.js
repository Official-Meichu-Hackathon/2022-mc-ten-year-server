import { join } from 'path';
import { forms as _forms } from '@googleapis/forms';
import { authenticate } from '@google-cloud/local-auth';

const formID = '1ziPJ4GKBb1yeC9Q4kB9EABM-suTxu_IPTDmhr62-ais';

async function runSample(query) {
  const auth = await authenticate({
    keyfilePath: join(__dirname, '../../libs/credentials.json'),
    // TODO: change here
    scopes: 'https://www.googleapis.com/auth/forms.responses.readonly'
  });

  const forms = _forms({
    version: 'v1',
    auth
  });

  console.log('Hello there');
  // TODO: change here
  const res = await forms.forms.responses.list({ formId: formID });
  console.log(res.data.responses[0].answers[2]);
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
export default runSample;
