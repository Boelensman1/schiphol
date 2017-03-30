import fetch from 'node-fetch';

import getFlights from './getFlights';

import { Params } from './interfaces';

interface Queue {
  push: Function;
}

const pageRegex = /page=(\d*).+rel="(\w*)"/;

interface LocationInfo {
  next?: number;
  last?: number;
  prev?: number;
}

export default class Schiphol {
  public getFlights: Function;

  constructor(private applicationId: string, private applicationKey: string) {
    // add functions
    this.getFlights = getFlights;
  }

  fetch(url: string, params: Params = {}): any {
    params.app_id = this.applicationId;
    params.app_key = this.applicationKey;

    let page = 0;
    if (params.page) {
      page = params.page;
    }

    let paramString = '';
    for (const param in params) {
      if (param !== 'getAllPages' && param !== 'page') {
        paramString += `&${param}=${params[param]}`;
      }
    }
    // replace the first symbol with an ?
    paramString = '?' + paramString.substring(1);

    return this.getResponse(url, params.getAllPages === true, paramString, page);
}

  private getLocationInfoFromLinkHeader(linkHeader: string): LocationInfo {
    const locationInfo = {} as LocationInfo;
    if (!linkHeader) {
      return locationInfo;
    }

    let matches;
    linkHeader.split(',').forEach(linkPart => {
      if ((matches = pageRegex.exec(linkPart)) !== null) {
        const page = parseInt(matches[1], 10);
        const type = matches[2];
        locationInfo[type] = page;
        }
      });

    return locationInfo;
  }

  private parseResult(res) {
    return res.json().then(response => {
      delete response.schemaVersion;
      return response[Object.keys(response)[0]];
    }).catch(err => {
      throw new Error('Unable to parse response json.');
    });
  }

  private getResponse(url: string, getAllPages: boolean, paramString: string, page: number) {
    return fetch(url + paramString + '&page=' + page, {
      headers: {ResourceVersion: 'v3'},
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Unexpected response status "${res.status}: ${res.statusText}"`);
      }
      const linkHeader = res.headers.get('link');
      const locationInfo = this.getLocationInfoFromLinkHeader(linkHeader);

      if (getAllPages && locationInfo.next) {
        // we need to get the next page!
        return Promise.all([
          this.parseResult(res),
          this.getResponse(url, getAllPages, paramString, locationInfo.next),
        ]).then(result => ({
          response: result[0].concat(result[1].response),
          }),
        );
      } else {
        return this.parseResult(res).then(response => ({
          locationInfo,
          response,
        }));
      }
    });
  }
}
