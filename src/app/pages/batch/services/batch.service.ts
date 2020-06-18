import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, zip } from 'rxjs';

import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';

import { DIMBatch } from '../models/batch.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { mergeMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class BatchService {
  namespace = 'DIM_BATCH_METADATA';
  baseURL = 'api';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param_payload
   */
  createBatch(payload: { batch: DIMBatch }): Observable<any> {
    const batch: DIMBatch = payload.batch;
    const uid = batch?.id ? batch?.id : uuid('', 11);
    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${uid}`;
    return this.httpClient.post<any>(endPointURL, batch, httpOptions);
  }

  getBatches(): Observable<Array<any>> {
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

  updateBatch(payload: { batch: DIMBatch }): Observable<any> {
    if (payload) {
      const batch: DIMBatch = payload?.batch;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${batch?.id}`;
      return this.httpClient.put<any>(endPointURL, batch, httpOptions);
    }
  }

  deletebatch(payload: { batch: DIMBatch }): Observable<any> {
    if (payload) {
      const batch: DIMBatch = payload?.batch;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${batch?.id}`;
      return this.httpClient.delete<any>(endPointURL, httpOptions);
    }
  }
}
