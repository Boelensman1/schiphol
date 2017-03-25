import SchipholApi from '..';

require('./getFlights.mock'); // tslint:disable-line

const schipholApi = new SchipholApi('', '');

describe('getFlights', () => {
  test('Gets the first page of flights', () => (
    schipholApi.getFlights().then(request => {
      expect(request.result).toHaveLength(20);
      expect(request.locationInfo).toEqual({next: 1, last: 2});
    })
  ));
  test('Gets all pages of flights', () => (
    schipholApi.getFlights({getAllPages: true}).then(request => {
      expect(request.result).toHaveLength(60);
      expect(request.locationInfo).toEqual(undefined);
    })
  ));
});
