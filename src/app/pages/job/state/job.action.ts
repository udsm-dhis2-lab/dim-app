/**
 *
 */
import { createAction, props } from '@ngrx/store';

/**
 *
 */
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { Update } from '@ngrx/entity';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMJob } from '../models/job.model';

/**
 *
 */
export enum JobActionType {
    SET_SELECTED_JOB = '[Job] Set Selected Job',
    CREATE_JOB = '[Job] Create Job',
    CREATE_JOB_SUCCESS = '[Job] Create Job Success',
    CREATE_JOB_FAIL = '[Job] Create Job Fail',
    UPDATE_JOB = '[Job] Update Job',
    UPDATE_JOB_SUCCESS = '[Job] Update Job Success',
    UPDATE_JOB_FAIL = '[Job] Update Job Fail',
    LOAD_JOBS = '[Job] Load Jobs',
    LOAD_JOBS_SUCCESS = '[Job] Load Jobs Success',
    LOAD_JOBS_FAIL = '[Job] Load Jobs Fail',
    DELETE_JOB = '[Job] Delete Job',
    DELETE_JOB_SUCCESS = '[Job] Delete Job Success',
    DELETE_JOB_FAIL = '[Job] Delete Job Fail',
}

export const CreateJob = createAction(
    JobActionType.CREATE_JOB,
    props<{ job: DIMJob }>()
);

export const SetSelectedJob = createAction(
    JobActionType.SET_SELECTED_JOB,
    props<{ job: DIMJob }>()
);

export const CreateJobSuccess = createAction(
    JobActionType.CREATE_JOB_SUCCESS,
    props<{
        response: HTTPResponse;
        job: DIMJob;
    }>()
);

export const CreateJobFail = createAction(
    JobActionType.CREATE_JOB_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const UpdateJob = createAction(
    JobActionType.UPDATE_JOB,
    props<{ job: DIMJob }>()
);

export const UpdateJobSuccess = createAction(
    JobActionType.UPDATE_JOB_SUCCESS,
    props<{ job: Update<DIMJob>; payload: DIMJob }>()
);

export const UpdateJobFail = createAction(
    JobActionType.UPDATE_JOB_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const LoadJobs = createAction(JobActionType.LOAD_JOBS);

export const LoadJobsSuccess = createAction(
    JobActionType.LOAD_JOBS_SUCCESS,
    props<{ jobs: Array<DIMJob> }>()
);

export const LoadJobsFail = createAction(
    JobActionType.LOAD_JOBS_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const DeleteJob = createAction(
    JobActionType.DELETE_JOB,
    props<{ job: DIMJob }>()
);

export const DeleteJobSuccess = createAction(
    JobActionType.DELETE_JOB_SUCCESS,
    props<{ response: HTTPResponse; payload: DIMJob }>()
);

export const DeleteJobFail = createAction(
    JobActionType.DELETE_JOB_FAIL,
    props<{ error: HTTPErrorMessage }>()
);
