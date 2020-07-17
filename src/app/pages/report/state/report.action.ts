/**
 *
 */
import { createAction, props } from '@ngrx/store';

/**
 *
 */
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMReport } from '../models/report.model';
import { Dataset } from '../models/dataset.model';
import { Data } from '../models/data.model';
import { IntegratedSystem } from '../models/system.model';
import { ReportMetadata } from '../models/report-metadata.model';

/**
 *
 */
export enum ReportActionType {
    GENERATE_REPORT = '[Report] Generate Report',
    GENERATE_REPORT_SUCCESS = '[Report] Generate Report Success',
    GENERATE_REPORT_FAIL = '[Report] Generate Report Fail',
    LOAD_DATASETS = '[Dataset] Load Datasets',
    LOAD_DATASETS_SUCCESS = '[Dataset] Load Datasets Success',
    LOAD_DATASETS_FAIL = '[Dataset] Load Dataset Fail',
    LOAD_INTEGRATED_SYSTEMS = '[System] Load Systems',
    LOAD_INTEGRATED_SYSTEMS_SUCCESS = '[System] Load Systems Success',
    LOAD_INTEGRATED_SYSTEMS_FAIL = '[System] Load Systems Fail',
    LOAD_DATAS = '[Datas] Load Datas',
    LOAD_DATAS_SUCCESS = '[Datas] Load Datas Success',
    LOAD_DATAS_FAIL = '[Datas] Load Datas Fail',
}

/**
 *
 */
export const LoadDatasets = createAction(ReportActionType.LOAD_DATASETS);

export const LoadDatasetsSuccess = createAction(
    ReportActionType.LOAD_DATASETS_SUCCESS,
    props<{ datasets: Array<Dataset> }>()
);

export const LoadDatasetsFail = createAction(
    ReportActionType.LOAD_DATASETS_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

/**
 *
 */
export const LoadDatas = createAction(ReportActionType.LOAD_DATAS);

export const LoadDatasSuccess = createAction(
    ReportActionType.LOAD_DATAS_SUCCESS,
    props<{ datas: Array<Data> }>()
);

export const LoadDatasFail = createAction(
    ReportActionType.LOAD_DATASETS_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

/**
 *
 */
export const LoadIntegratedSystems = createAction(
    ReportActionType.LOAD_INTEGRATED_SYSTEMS
);

export const LoadIntegratedSystemsSuccess = createAction(
    ReportActionType.LOAD_INTEGRATED_SYSTEMS_SUCCESS,
    props<{ integratedSystems: Array<IntegratedSystem> }>()
);

export const LoadIntegratedSystemsFail = createAction(
    ReportActionType.LOAD_INTEGRATED_SYSTEMS_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

/**
 *
 */
export const GenerateReport = createAction(
    ReportActionType.GENERATE_REPORT,
    props<{ reportMetadata: ReportMetadata }>()
);

export const GenerateReportSuccess = createAction(
    ReportActionType.GENERATE_REPORT_SUCCESS,
    props<{
        reports: Array<DIMReport>;
    }>()
);

export const GenerateReportFail = createAction(
    ReportActionType.GENERATE_REPORT_FAIL,
    props<{ error: HTTPErrorMessage }>()
);
