import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';
import { DIMAuth } from '../models/auth.model';
import { Observable, zip } from 'rxjs';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  namespace = 'DIM_AUTH_METADATA';
  baseURL = 'api';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param_payload
   */
  createAuth(payload: { auth: DIMAuth }): Observable<HTTPResponse> {
    const auth: DIMAuth = payload.auth;
    const uid = auth?.id ? auth?.id : uuid('', 11);
    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${uid}`;
    return this.httpClient.post<any>(endPointURL, auth, httpOptions);
  }

  getAuths(): Observable<Array<any>> {
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

  updateAuth(payload: { auth: DIMAuth }): Observable<any> {
    if (payload) {
      const auth: DIMAuth = payload?.auth;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${auth?.id}`;
      return this.httpClient.put<any>(endPointURL, auth, httpOptions);
    }
  }

  deleteAuth(payload: { auth: DIMAuth }): Observable<any> {
    if (payload) {
      const auth: DIMAuth = payload?.auth;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${auth?.id}`;
      return this.httpClient.delete<any>(endPointURL, httpOptions);
    }
  }
}
