import Schiphol from '..';

require('./errorHandling.mock'); // tslint:disable-line

const schiphol = new Schiphol('', '');

describe('Test the base error handling', () => {
  test('No keys', () => (
    schiphol.getFlights().then(res => {
      // we shouldn't get her
      expect(true).toBeFalsy();
    }).catch(err => {
      expect(err instanceof Error).toBeTruthy();
      expect(err.message).toBe('Unexpected response status "403: Forbidden"');
    })
  ));
});
