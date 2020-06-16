import { createFeatureSelector, createSelector } from '@ngrx/store';
import { systemAdapter, SystemState } from './integration.state';

export const getSystemFeature = createFeatureSelector('systemIntegrations');

/**
 * Reports Selectors
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

export const getSystemError = createSelector(
    getSystemFeature,
    (state: SystemState) => state?.error
);

export const getSystemLoading = createSelector(
    getSystemFeature,
    (state: SystemState) => state.loading
);

export const getFieldLoaded = createSelector(
    getSystemFeature,
    (state: SystemState) => state.loaded
);
