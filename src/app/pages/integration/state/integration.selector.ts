import { createFeatureSelector, createSelector } from '@ngrx/store';
import { integrationAdapter, IntegrationState } from './integration.state';

export const getIntegrationFeature = createFeatureSelector('integration');

/**
 * Integration Selectors
 */
export const getAllIntegrations = createSelector(
    getIntegrationFeature,
    integrationAdapter.getSelectors().selectAll
);

export const getSelectedIntegration = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state.selectedIntegration
);

export const getCreatedIntegration = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state.integration
);

export const getIntegrationCreatedStatus = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state?.created
);

export const getIntegrationEditedStatus = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state.edited
);

export const getIntegrationError = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state?.error
);

export const getIntegrationLoading = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state.loading
);

export const getIntegrationLoaded = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state.loaded
);

export const getDeletedIntegrationStatus = createSelector(
    getIntegrationFeature,
    (state: IntegrationState) => state.deleted
);
