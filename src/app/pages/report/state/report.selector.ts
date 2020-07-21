import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector,
} from '@ngrx/store';
import {
    reportAdapter,
    ReportState,
    datasetAdapter,
    DatasetState,
    dataAdapter,
    DataState,
    integratedSystemAdapter,
    IntegratedSystemState,
} from './report.state';

export const getReportFeature = createFeatureSelector('report');
export const getDatasetFeature = createFeatureSelector('dataSet');
export const getDataFeature = createFeatureSelector('data');
export const getIntegratedSystemFeature = createFeatureSelector(
    'integratedSystem'
);

export const getReportDetails = createSelector(
    getReportFeature,
    reportAdapter.getSelectors().selectAll
);

export const getReportDetailTotality = createSelector(
    getReportFeature,
    reportAdapter.getSelectors().selectTotal
);

export const getReportGeneratedError = createSelector(
    getReportFeature,
    (state: ReportState) => state?.error
);

export const getReportGeneratedLoading = createSelector(
    getReportFeature,
    (state: ReportState) => state.loading
);

export const getReportGeneratedLoaded = createSelector(
    getReportFeature,
    (state: ReportState) => state.loaded
);

/**
 * Dataset Selectors
 */
export const getDatasets = createSelector(
    getDatasetFeature,
    datasetAdapter.getSelectors().selectAll
);

export const getSelectedDataset = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state.selectedDataset
);

export const getCreatedDataset = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state.dataSet
);

export const getCreatedDatasetStatus = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state?.created
);

export const getEditedDatasetStatus = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state.edited
);

export const getDatasetError = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state?.error
);

export const getDatasetLoading = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state.loading
);

export const getDatasetLoaded = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state.loaded
);

export const getDeletedDatasetStatus = createSelector(
    getDatasetFeature,
    (state: DatasetState) => state.deleted
);

/**
 * Data Selectors
 */
export const getDatas = createSelector(
    getDataFeature,
    dataAdapter.getSelectors().selectAll
);

export const getSelectedData = createSelector(
    getDataFeature,
    (state: DataState) => state.selectedData
);

export const getCreatedData = createSelector(
    getDataFeature,
    (state: DataState) => state.data
);

export const getCreatedDataStatus = createSelector(
    getDataFeature,
    (state: DataState) => state?.created
);

export const getEditedDataStatus = createSelector(
    getDataFeature,
    (state: DataState) => state.edited
);

export const getDataError = createSelector(
    getDataFeature,
    (state: DataState) => state?.error
);

export const getDataLoading = createSelector(
    getDataFeature,
    (state: DataState) => state.loading
);

export const getDataLoaded = createSelector(
    getDataFeature,
    (state: DataState) => state.loaded
);

export const getDeletedDataStatus = createSelector(
    getDataFeature,
    (state: DataState) => state.deleted
);

/**
 * Integrated System Selectors
 */
export const getIntegratedSystems = createSelector(
    getIntegratedSystemFeature,
    integratedSystemAdapter.getSelectors().selectAll
);

export const getSelectedIntegratedSystem = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state.selectedIntegratedSystem
);

export const getCreatedIntegratedSystem = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state.integratedSystem
);

export const getCreatedIntegratedSystemStatus = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state?.created
);

export const getEditedIntegratedSystemStatus = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state.edited
);

export const getIntegratedSystemError = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state?.error
);

export const getIntegratedSystemLoading = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state.loading
);

export const getIntegratedSystemLoaded = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state.loaded
);

export const getDeletedIntegratedSystemStatus = createSelector(
    getIntegratedSystemFeature,
    (state: IntegratedSystemState) => state.deleted
);
