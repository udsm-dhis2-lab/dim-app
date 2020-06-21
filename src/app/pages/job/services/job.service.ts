import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { uuid } from '@icodebible/utils/uuid';
import { mergeMap } from 'rxjs/operators';
import * as _ from 'lodash';

import { DIMJob } from '../models/job.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class JobService {
  namespace = 'DIM_JOB_METADATA';
  baseURL = 'api';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @param_payload
   */
  createJob(payload: { job: DIMJob }): Observable<any> {
    const job: DIMJob = payload.job;
    const uid = job?.id ? job?.id : uuid('', 11);
    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${uid}`;
    return this.httpClient.post<any>(endPointURL, job, httpOptions);
  }

  getJobs(): Observable<Array<any>> {
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

  updateJob(payload: { job: DIMJob }): Observable<any> {
    if (payload) {
      const job: DIMJob = payload?.job;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${job?.id}`;
      return this.httpClient.put<any>(endPointURL, job, httpOptions);
    }
  }

  deleteJob(payload: { job: DIMJob }): Observable<any> {
    if (payload) {
      const job: DIMJob = payload?.job;
      const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${job?.id}`;
      return this.httpClient.delete<any>(endPointURL, httpOptions);
    }
  }
}
