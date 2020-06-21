import { createFeatureSelector, createSelector } from '@ngrx/store';
import { batchAdapter, BatchState } from './batch.state';

export const getBatchFeature = createFeatureSelector('batch');

/**
 * Batch Selectors
 */
export const getAllBatches = createSelector(
    getBatchFeature,
    batchAdapter.getSelectors().selectAll
);

export const getSelectedBatch = createSelector(
    getBatchFeature,
    (state: BatchState) => state.selectedBatch
);

export const getCreatedBatch = createSelector(
    getBatchFeature,
    (state: BatchState) => state.batch
);

export const getBatchCreatedStatus = createSelector(
    getBatchFeature,
    (state: BatchState) => state?.created
);

export const getBatchEditedStatus = createSelector(
    getBatchFeature,
    (state: BatchState) => state.edited
);

export const getBatchError = createSelector(
    getBatchFeature,
    (state: BatchState) => state?.error
);

export const getBatchLoading = createSelector(
    getBatchFeature,
    (state: BatchState) => state.loading
);

export const getBatchLoaded = createSelector(
    getBatchFeature,
    (state: BatchState) => state.loaded
);

export const getDeletedBatchStatus = createSelector(
    getBatchFeature,
    (state: BatchState) => state.deleted
);
