/**
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  api = 'api';

  constructor(private httpClient: HttpClient) {}

  /**
   *
   * @params systemIntegration
   */
  createIntegration(systemIntegration: SystemIntegration): Observable<any> {
    const endPointURL = `${this.api}/dataStore`;
    return this.httpClient.post<any>(
      endPointURL,
      systemIntegration,
      httpOptions
    );
  }
}
