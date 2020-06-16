import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';

import { DIMSystem } from '../../home/models/integration.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  namespace = 'DIM_SYSTEMS_METADATA';
  baseURL = 'api';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @params systemIntegration
   */
  createSystemIntegration(payload: {
    [key: string]: DIMSystem;
  }): Observable<any> {
    const systemIntegration: DIMSystem = payload.systemIntegration;
    const uid = systemIntegration?.id ? systemIntegration?.id : uuid('', 11);

    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${uid}`;
    return this.httpClient.post<any>(
      endPointURL,
      systemIntegration,
      httpOptions
    );
  }

  getSystems(): Observable<any> {
    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}`;
    return this.httpClient.get(endPointURL).pipe(
      mergeMap((uids: Array<string>) => {
        return zip(
          ..._.map(uids, (uid: string) => {
            return this.httpClient.get(
              `${this.baseURL}/dataStore/${this.namespace}/${uid}`
            );
          })
        );
      })
    );
  }
}
