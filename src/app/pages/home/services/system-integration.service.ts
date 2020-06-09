/**
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { uuid } from '@icodebible/utils/uuid';
/**
 *
 */
import { SystemIntegration } from '../models/integration.model';
/**
 *
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class SystemIntegrationService {
  namespace = 'DIMSystemIntegration';
  baseURL = 'api';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @params systemIntegration
   */
  createSystemIntegration(payload: {
    [key: string]: SystemIntegration;
  }): Observable<any> {
    const systemIntegration: SystemIntegration = payload.systemIntegration;
    const uid = uuid('', 11);
    const endPointURL = `${this.baseURL}/dataStore/${this.namespace}/${uid}`;
    return this.httpClient.post<any>(
      endPointURL,
      systemIntegration,
      httpOptions
    );
  }
}
