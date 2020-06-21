import { createFeatureSelector, createSelector } from '@ngrx/store';
import { jobAdapter, JobState } from './job.state';

export const getJobFeature = createFeatureSelector('job');

/**
 * Job Selectors
 */
export const getAllJobs = createSelector(
    getJobFeature,
    jobAdapter.getSelectors().selectAll
);

export const getSelectedJob = createSelector(
    getJobFeature,
    (state: JobState) => state.selectedJob
);

export const getCreatedJob = createSelector(
    getJobFeature,
    (state: JobState) => state.job
);

export const getJobCreatedStatus = createSelector(
    getJobFeature,
    (state: JobState) => state?.created
);

export const getJobEditedStatus = createSelector(
    getJobFeature,
    (state: JobState) => state.edited
);

export const getJobError = createSelector(
    getJobFeature,
    (state: JobState) => state?.error
);

export const getJobLoading = createSelector(
    getJobFeature,
    (state: JobState) => state.loading
);

export const getJobLoaded = createSelector(
    getJobFeature,
    (state: JobState) => state.loaded
);

export const getDeletedJobStatus = createSelector(
    getJobFeature,
    (state: JobState) => state.deleted
);
