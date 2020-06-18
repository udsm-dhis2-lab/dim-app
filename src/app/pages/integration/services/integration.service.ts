import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';

import * as _ from 'lodash';

import { uuid } from '@icodebible/utils/uuid';

import { DIMIntegration } from '../models/integration.model';
import { mergeMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {
  namespace = 'DIM_INTEGRATION_METADATA';
  baseURL = 'api';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param_payload
   */
  createIntegration(payload: { integration: DIMIntegration }): Observable<any> {
    const integration: DIMIntegration = payload.integration;
    const uid = integration?.id ? integration?.id : uuid('', 11);
    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${uid}`;
    return this.httpClient.post<any>(endPointURL, integration, httpOptions);
  }

  getIntegrations(): Observable<any> {
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

  updateIntegration(payload: { integration: DIMIntegration }): Observable<any> {
    if (payload) {
      const integration: DIMIntegration = payload?.integration;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${integration?.id}`;
      return this.httpClient.put<any>(endPointURL, integration, httpOptions);
    }
  }

  deleteIntegration(payload: { integration: DIMIntegration }): Observable<any> {
    if (payload) {
      const integration: DIMIntegration = payload?.integration;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${integration?.id}`;
      return this.httpClient.delete<any>(endPointURL, httpOptions);
    }
  }
}
