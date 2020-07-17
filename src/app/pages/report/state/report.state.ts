/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMReport } from '../models/report.model';
import { Dataset } from '../models/dataset.model';
import { Data } from '../models/data.model';
import { IntegratedSystem } from '../models/system.model';
/**
 *
 */
export interface ReportState extends EntityState<DIMReport> {
    selectedReportId: string | number | null;
    selectedReport: DIMReport;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    report: DIMReport;
}

/**
 *
 */
export const reportAdapter: EntityAdapter<DIMReport> = createEntityAdapter<
    DIMReport
>();

/**
 *
 */
export const defaultReportState: ReportState = {
    ids: [],
    entities: {},
    selectedReportId: null,
    selectedReport: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    report: null,
};

/**
 *
 */
export const initialReportState = reportAdapter.getInitialState(
    defaultReportState
);

/**
 *
 */
export interface DatasetState extends EntityState<Dataset> {
    selectedDatasetId: string | number | null;
    selectedDataset: Dataset;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    dataSet: Dataset;
}

/**
 *
 */
export const datasetAdapter: EntityAdapter<Dataset> = createEntityAdapter<
    Dataset
>();

/**
 *
 */
export const defaultDatasetState: DatasetState = {
    ids: [],
    entities: {},
    selectedDatasetId: null,
    selectedDataset: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    dataSet: null,
};

/**
 *
 */
export const initialDatasetState = datasetAdapter.getInitialState(
    defaultDatasetState
);

/**
 *
 */
export interface DataState extends EntityState<Data> {
    selectedDataId: string | number | null;
    selectedData: Dataset;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    data: Data;
}

/**
 *
 */
export const dataAdapter: EntityAdapter<Data> = createEntityAdapter<Data>();

/**
 *
 */
export const defaultDataState: DataState = {
    ids: [],
    entities: {},
    selectedDataId: null,
    selectedData: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    data: null,
};

/**
 *
 */
export const initialDataState = dataAdapter.getInitialState(defaultDataState);

/**
 *
 */
export interface IntegratedSystemState extends EntityState<IntegratedSystem> {
    selectedIntegratedSystemId: string | number | null;
    selectedIntegratedSystem: IntegratedSystem;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    integratedSystem: IntegratedSystem;
}

/**
 *
 */
export const integratedSystemAdapter: EntityAdapter<IntegratedSystem> = createEntityAdapter<
    IntegratedSystem
>();

/**
 *
 */
export const defaultIntegratedSystemState: IntegratedSystemState = {
    ids: [],
    entities: {},
    selectedIntegratedSystemId: null,
    selectedIntegratedSystem: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    integratedSystem: null,
};

/**
 *
 */
export const initialIntegratedSystemState = integratedSystemAdapter.getInitialState(
    defaultIntegratedSystemState
);
