/**
 *
 */
import { createReducer, Action, on } from '@ngrx/store';
import {
    initialReportState,
    ReportState,
    reportAdapter,
    initialDatasetState,
    DatasetState,
    datasetAdapter,
    DataState,
    initialDataState,
    IntegratedSystemState,
    integratedSystemAdapter,
    initialIntegratedSystemState,
} from './report.state';
import {
    GenerateReportSuccess,
    GenerateReportFail,
    LoadDatasetsSuccess,
    LoadDatasetsFail,
    LoadDatasSuccess,
    LoadDatasFail,
    LoadIntegratedSystemsSuccess,
    LoadIntegratedSystemsFail,
} from './report.action';
/**
 *
 */
const ReportReducer = createReducer(
    initialReportState,
    on(GenerateReportSuccess, (state: ReportState, { reports }) => {
        return reportAdapter.setAll(reports, {
            ...state,
            created: true,
            reports,
        });
    }),
    on(GenerateReportFail, (state: ReportState, { error }) => ({
        ...state,
        created: false,
        error,
    }))
);
/**
 *
 * @state
 * @action
 */
export function _ReportReducer(state: ReportState | undefined, action: Action) {
    /**
     *
     */
    return ReportReducer(state, action);
}

/**
 *
 */
const DatasetReducer = createReducer(
    initialDatasetState,
    on(LoadDatasetsSuccess, (state: DatasetState, { datasets }) => {
        return datasetAdapter.setAll(datasets, {
            ...state,
            created: true,
            datasets,
        });
    }),
    on(LoadDatasetsFail, (state: DatasetState, { error }) => ({
        ...state,
        created: false,
        error,
    }))
);
/**
 *
 * @state
 * @action
 */
export function _DatasetReducer(
    state: DatasetState | undefined,
    action: Action
) {
    /**
     *
     */
    return DatasetReducer(state, action);
}

/**
 *
 */
const DataReducer = createReducer(
    initialDataState,
    on(LoadDatasSuccess, (state: DataState, { datas }) => {
        return datasetAdapter.setAll(datas, {
            ...state,
            created: true,
            datas,
        });
    }),
    on(LoadDatasFail, (state: DataState, { error }) => ({
        ...state,
        created: false,
        error,
    }))
);
/**
 *
 * @state
 * @action
 */
export function _DataReducer(state: DataState | undefined, action: Action) {
    /**
     *
     */
    return DataReducer(state, action);
}

/**
 *
 */
const IntegratedSystemReducer = createReducer(
    initialIntegratedSystemState,
    on(
        LoadIntegratedSystemsSuccess,
        (state: IntegratedSystemState, { integratedSystems }) => {
            return integratedSystemAdapter.setAll(integratedSystems, {
                ...state,
                created: true,
                integratedSystems,
            });
        }
    ),
    on(LoadIntegratedSystemsFail, (state: IntegratedSystemState, { error }) => ({
        ...state,
        created: false,
        error,
    }))
);
/**
 *
 * @state
 * @action
 */
export function _IntegratedSystemReducer(
    state: IntegratedSystemState | undefined,
    action: Action
) {
    /**
     *
     */
    return IntegratedSystemReducer(state, action);
}
