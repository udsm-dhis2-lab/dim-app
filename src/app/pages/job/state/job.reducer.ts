/**
 *
 */
import { createReducer, Action, on } from '@ngrx/store';
import { initialJobState, JobState, jobAdapter } from './job.state';
import {
    SetSelectedJob,
    CreateJobSuccess,
    CreateJobFail,
    UpdateJobSuccess,
    UpdateJobFail,
    LoadJobsSuccess,
    LoadJobsFail,
    DeleteJobSuccess,
    DeleteJobFail,
} from './job.action';

/**
 *
 */
const mJobReducer = createReducer(
    initialJobState,
    on(SetSelectedJob, (state: JobState, { job }) => ({
        ...state,
        selectedJob: job,
    })),
    on(CreateJobSuccess, (state: JobState, { response, job }) => {
        return jobAdapter.addOne(job, {
            ...state,
            created: true,
            response,
            job,
        });
    }),
    on(CreateJobFail, (state: JobState, { error }) => ({
        ...state,
        created: false,
        error,
    })),
    on(UpdateJobSuccess, (state: JobState, { job, payload }) => {
        return jobAdapter.updateOne(job, {
            ...state,
            loaded: false,
            loading: false,
            edited: true,
            selectedJobId: payload?.id,
            job: payload,
        });
    }),
    on(UpdateJobFail, (state: JobState, { error }) => ({
        ...state,
        selectedJobId: null,
        edited: false,
        error,
    })),
    on(LoadJobsSuccess, (state: JobState, { jobs }) => {
        return jobAdapter.setAll(jobs, {
            ...state,
            loading: false,
            loaded: true,
        });
    }),
    on(LoadJobsFail, (state: JobState, { error }) => ({
        ...state,
        entities: {},
        error,
    })),
    on(DeleteJobSuccess, (state: JobState, { response, payload }) => {
        return jobAdapter.removeOne(payload?.id, {
            ...state,
            deleted: true,
        });
    }),
    on(DeleteJobFail, (state: JobState, { error }) => ({
        ...state,
        deleted: false,
        error,
    }))
);
/**
 *
 * @state
 * @action
 */
export function _JobReducer(state: JobState | undefined, action: Action) {
    /**
     *
     */
    return mJobReducer(state, action);
}
