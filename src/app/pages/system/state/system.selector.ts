import { createFeatureSelector, createSelector } from '@ngrx/store';
import { systemAdapter, SystemState } from './system.state';

export const getSystemFeature = createFeatureSelector('system');

/**
 * System Selectors
 */
export const getAllSystems = createSelector(
    getSystemFeature,
    systemAdapter.getSelectors().selectAll
);

export const getSelectedSystem = createSelector(
    getSystemFeature,
    (state: SystemState) => state.selectedSystem
);

export const getCreatedSystem = createSelector(
    getSystemFeature,
    (state: SystemState) => state.system
);

export const getSystemCreatedStatus = createSelector(
    getSystemFeature,
    (state: SystemState) => state?.created
);

export const getSystemEditedStatus = createSelector(
    getSystemFeature,
    (state: SystemState) => state.edited
);

export const getSystemError = createSelector(
    getSystemFeature,
    (state: SystemState) => state?.error
);

export const getSystemLoading = createSelector(
    getSystemFeature,
    (state: SystemState) => state.loading
);

export const getSystemLoaded = createSelector(
    getSystemFeature,
    (state: SystemState) => state.loaded
);

export const getDeletedSystemStatus = createSelector(
    getSystemFeature,
    (state: SystemState) => state.deleted
);
