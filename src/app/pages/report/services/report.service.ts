import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Data } from '../models/data.model';
import date from 'date-and-time';
import { DataAPIResult } from '../models/api/data-api-result.model';
import { IntegratedSystemAPIResult } from '../models/api/integrated-system-api.model';
import { ReportMetadata, Period } from '../models/report-metadata.model';
import { ReportAPIResult } from '../models/api/report-api-result.model';
import { DatasetAPIResult } from '../models/api/dataset-api-result.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseURL = '../../../../api';

  constructor(private httpClient: HttpClient) {}

  generateReport(reportMetadata: ReportMetadata): Observable<ReportAPIResult> {
    const startDate = date.format(reportMetadata.startDate, 'YYYY-MM-DD');
    const endDate = date.format(reportMetadata.endDate, 'YYYY-MM-DD');
    const status = reportMetadata.status;
    const dataSet = reportMetadata.dataSet;
    const sourceSystem = reportMetadata.sourceSystem.id;
    const destinationSystem = reportMetadata.destinationSystem.id;
    const dataIds = _.join(
      _.map(reportMetadata.datas, (data: Data) => data.id),
      ';'
    );
    const periodIds = _.join(
      _.map(reportMetadata.periods, (period: Period) => period.id),
      ';'
    );
    const url = `${this.baseURL}/reports?dx=${dataIds}&pe=${periodIds}&startDate=${startDate}&endDate=${endDate}&sourceSystem=${sourceSystem}&destinationSystem=${destinationSystem}&filter=status:${status}&filter=dataSet:${dataSet}`;
    return this.httpClient.get<ReportAPIResult>(url);
  }

  getDatasets(): Observable<DatasetAPIResult> {
    const endPointURL = `${this.baseURL}/dataSets`;
    return this.httpClient.get<DatasetAPIResult>(endPointURL);
  }

  getDatas(): Observable<DataAPIResult> {
    const endPointURL = `${this.baseURL}/datas`;
    return this.httpClient.get<DataAPIResult>(endPointURL);
  }

  getIntegratedSystems(): Observable<IntegratedSystemAPIResult> {
    const endPointURL = `${this.baseURL}/systems`;
    return this.httpClient.get<IntegratedSystemAPIResult>(endPointURL);
  }
}
