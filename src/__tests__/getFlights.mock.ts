/* tslint:disable:max-line-length no-var-requires*/
import nock = require('nock');

const firstPageOfFlights = require('./responses/firstPageOfFlights.json');

const reqheaders = {
  resourceversion: 'v3',
};

nock('https://api.schiphol.nl/public-flights/', { reqheaders })
  .get('/flights')
  .times(212)
  .query({
    page: 0,
    app_id: 'appId',
    app_key: 'appKey',
  })
  .reply(200, firstPageOfFlights, {
  Link: '<https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=2>; rel="last", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=1>; rel="next"',
});

nock('https://api.schiphol.nl/public-flights/', { reqheaders })
  .get('/flights')
  .query({
    page: 1,
    app_id: 'appId',
    app_key: 'appKey',
  })
  .reply(200, firstPageOfFlights, {
  Link: '<https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted>; rel="first", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=2>; rel="last", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=2>; rel="next", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=0>; rel="prev"',
});

nock('https://api.schiphol.nl/public-flights/', { reqheaders })
  .get('/flights')
  .query({
    page: 2,
    app_id: 'appId',
    app_key: 'appKey',
  })
  .reply(200, firstPageOfFlights, {
  Link: '<https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted>; rel="first", <https://api.schiphol.nl:443/public-flights/flights?app_id=redacted&app_key=redacted&page=1>; rel="prev"',
});
