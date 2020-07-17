/**
 *
 */
import { Injectable } from '@angular/core';
/**
 *
 */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
/**
 *
 */
import * as _ from 'lodash';

import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { ReportService } from '../services/report.service';
import {
    ReportActionType,
    GenerateReportSuccess,
    GenerateReportFail,
    LoadDatasetsSuccess,
    LoadDatasetsFail,
    LoadDatasSuccess,
    LoadDatasFail,
    LoadIntegratedSystemsSuccess,
    LoadIntegratedSystemsFail,
} from './report.action';
import { DatasetAPIResult } from '../models/api/dataset-api-result.model';
import { DataAPIResult } from '../models/api/data-api-result.model';
import { IntegratedSystemAPIResult } from '../models/api/integrated-system-api.model';
import { ReportMetadata } from '../models/report-metadata.model';
import { ReportAPIResult } from '../models/api/report-api-result.model';

@Injectable()
export class ReportEffects {
    constructor(
        private actions$: Actions,
        private reportService: ReportService
    ) { }

    /**
     *
     */
    generateResourceTable$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActionType.GENERATE_REPORT),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((reportMetadataPayload: { reportMetadata: ReportMetadata }) =>
                this.reportService
                    .generateReport(reportMetadataPayload.reportMetadata)
                    .pipe(
                        map(
                            (reports: ReportAPIResult) =>
                                GenerateReportSuccess({
                                    reports: reports.reports,
                                }),
                            catchError((error: HTTPErrorMessage) =>
                                of(GenerateReportFail({ error }))
                            )
                        )
                    )
            )
        )
    );

    /**
     *
     */
    loadDatasets$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActionType.LOAD_DATASETS),
            switchMap(() =>
                this.reportService.getDatasets().pipe(
                    map((payload: DatasetAPIResult) =>
                        LoadDatasetsSuccess({ datasets: payload.dataSets })
                    ),
                    catchError((error: any) => of(LoadDatasetsFail({ error })))
                )
            )
        )
    );

    /**
     *
     */
    loadDatas$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActionType.LOAD_DATAS),
            switchMap(() =>
                this.reportService.getDatas().pipe(
                    map((payload: DataAPIResult) =>
                        LoadDatasSuccess({ datas: payload.datas })
                    ),
                    catchError((error: any) => of(LoadDatasFail({ error })))
                )
            )
        )
    );

    /**
     *
     */
    loadIntegratedSystems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ReportActionType.LOAD_INTEGRATED_SYSTEMS),
            switchMap(() =>
                this.reportService.getIntegratedSystems().pipe(
                    map((payload: IntegratedSystemAPIResult) =>
                        LoadIntegratedSystemsSuccess({ integratedSystems: payload.systems })
                    ),
                    catchError((error: any) => of(LoadIntegratedSystemsFail({ error })))
                )
            )
        )
    );
}
