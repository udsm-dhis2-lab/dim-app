import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authAdapter, AuthState } from './auth.state';

export const getAuthFeature = createFeatureSelector('auth');

/**
 * Integration Selectors
 */
export const getAllAuth = createSelector(
    getAuthFeature,
    authAdapter.getSelectors().selectAll
);

export const getSelectedAuth = createSelector(
    getAuthFeature,
    (state: AuthState) => state.selectedAuth
);

export const getCreatedAuth = createSelector(
    getAuthFeature,
    (state: AuthState) => state.auth
);

export const getAuthCreatedStatus = createSelector(
    getAuthFeature,
    (state: AuthState) => state?.created
);

export const getAuthEditedStatus = createSelector(
    getAuthFeature,
    (state: AuthState) => state.edited
);

export const getAuthError = createSelector(
    getAuthFeature,
    (state: AuthState) => state?.error
);

export const getAuthLoading = createSelector(
    getAuthFeature,
    (state: AuthState) => state.loading
);

export const getAuthLoaded = createSelector(
    getAuthFeature,
    (state: AuthState) => state.loaded
);

export const getDeletedAuthStatus = createSelector(
    getAuthFeature,
    (state: AuthState) => state.deleted
);
