/* tslint:disable:max-line-length no-var-requires*/
const nock = require('nock');
const firstPageOfFlights = require('./responses/firstPageOfFlights.json');

nock('https://api.schiphol.nl/public-flights/', {
      reqheaders: { resourceversion: 'v3' },
  })
  .get(/flights?.*page=0/).times(212)
  .reply(200, firstPageOfFlights, {
  Link: '<https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=2>; rel="last", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=1>; rel="next"',
});

nock('https://api.schiphol.nl/public-flights/', {
      reqheaders: { resourceversion: 'v3' },
  })
  .get(/flights?.*page=1/)
  .reply(200, firstPageOfFlights, {
  Link: '<https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted>; rel="first", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=2>; rel="last", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=2>; rel="next", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=0>; rel="prev"',
});

nock('https://api.schiphol.nl/public-flights/', {
      reqheaders: { resourceversion: 'v3' },
  })
  .get(/flights?.*page=2/)
  .reply(200, firstPageOfFlights, {
  Link: '<https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted>; rel="first", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=1>; rel="prev"',
});
