/* tslint:disable:max-line-length no-var-requires*/
import nock = require('nock');

nock('https://api.schiphol.nl/public-flights/', {
      reqheaders: { resourceversion: 'v3' },
  })
  .get('/flights')
  .query({
    page: 0,
    app_id: '',
    app_key: '',
  })
  .reply(403, 'Authentication parameters missing');
