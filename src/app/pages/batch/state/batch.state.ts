/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMBatch } from '../models/batch.model';
/**
 *
 */
export interface BatchState extends EntityState<DIMBatch> {
    selectedBatchId: string | number | null;
    selectedBatch: DIMBatch;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    batch: DIMBatch;
}

/**
 *
 */
export const batchAdapter: EntityAdapter<DIMBatch> = createEntityAdapter<
    DIMBatch
>();

/**
 *
 */
export const defaultBatchState: BatchState = {
    ids: [],
    entities: {},
    selectedBatchId: null,
    selectedBatch: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    batch: null,
};

/**
 *
 */
export const initialBatchState = batchAdapter.getInitialState(
    defaultBatchState
);
