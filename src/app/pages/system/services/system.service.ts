import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';
import { DIMSystem } from '../models/system.model';

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

  // const systems: [
  //   {
  //     name: 'DHIS2 HMIS',
  //     id: ''
  //   },
  //   {
  //     name: 'DHIS2 PLAY',
  //     id: ''
  //   }
  // ]

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param_payload
   */
  createSystem(payload: { system: DIMSystem }): Observable<any> {
    const system: DIMSystem = payload.system;
    const uid = system?.id ? system?.id : uuid('', 11);
    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${uid}`;
    return this.httpClient.post<any>(endPointURL, system, httpOptions);
  }

  getSystems(): Observable<Array<any>> {
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

  updateSystem(payload: { [key: string]: DIMSystem }): Observable<any> {
    if (payload) {
      const system: DIMSystem = payload?.system;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${system?.id}`;
      return this.httpClient.put<any>(endPointURL, system, httpOptions);
    }
  }

  deleteSystem(payload: { [key: string]: DIMSystem }): Observable<any> {
    if (payload) {
      const system: DIMSystem = payload?.system;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${system?.id}`;
      return this.httpClient.delete<any>(endPointURL, httpOptions);
    }
  }
}
