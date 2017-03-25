import { Flight } from './classes';
import { LocationInfo } from './interfaces';

export interface FlightResult {
  locationInfo?: LocationInfo;
  result: Array<Flight>;
}

export default function getFlights(params: Object): Promise<FlightResult> {
  return this.fetch('https://api.schiphol.nl/public-flights/flights', params)
  .then(result => ({
    locationInfo: result.locationInfo,
    result: result.response.map((flight => (new Flight(flight)))),
  }));
}
