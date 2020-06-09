import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    systemIntegrationAdapter,
    SystemIntegrationState,
} from './integration.state';

export const getSystemIntegrationFeature = createFeatureSelector(
    'systemIntegrations'
);

/**
 * Reports Selectors
 */
export const getAllSystemIntegrations = createSelector(
    getSystemIntegrationFeature,
    systemIntegrationAdapter.getSelectors().selectAll
);

export const getCreatedSystemIntegration = createSelector(
    getSystemIntegrationFeature,
    (state: SystemIntegrationState) => state.systemIntegration
);

export const getSystemIntegrationCreatedStatus = createSelector(
    getSystemIntegrationFeature,
    (state: SystemIntegrationState) => state?.created
);

export const getSystemIntegrationError = createSelector(
    getSystemIntegrationFeature,
    (state: SystemIntegrationState) => state?.error
);
