/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMJob } from '../models/job.model';
/**
 *
 */
export interface JobState extends EntityState<DIMJob> {
    selectedJobId: string | number | null;
    selectedJob: DIMJob;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    job: DIMJob;
}

/**
 *
 */
export const jobAdapter: EntityAdapter<DIMJob> = createEntityAdapter<DIMJob>();

/**
 *
 */
export const defaultJobState: JobState = {
    ids: [],
    entities: {},
    selectedJobId: null,
    selectedJob: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    job: null,
};

/**
 *
 */
export const initialJobState = jobAdapter.getInitialState(defaultJobState);
