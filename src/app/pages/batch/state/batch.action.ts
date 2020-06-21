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
import { DIMBatch } from '../models/batch.model';

/**
 *
 */
export enum BatchActionType {
    SET_SELECTED_BATCH = '[Batch] Set Selected Batch',
    CREATE_BATCH = '[Batch] Create Batch',
    CREATE_BATCH_SUCCESS = '[Batch] Create Batch Success',
    CREATE_BATCH_FAIL = '[Batch] Create Batch Fail',
    UPDATE_BATCH = '[Batch] Update Batch',
    UPDATE_BATCH_SUCCESS = '[Batch] Update Batch Success',
    UPDATE_BATCH_FAIL = '[Batch] Update Batch Fail',
    LOAD_BATCHES = '[Batch] Load Batches',
    LOAD_BATCHES_SUCCESS = '[Batch] Load Batches Success',
    LOAD_BATCHES_FAIL = '[Batch] Load Batches Fail',
    DELETE_BATCH = '[Batch] Delete Batch',
    DELETE_BATCH_SUCCESS = '[Batch] Delete Batch Success',
    DELETE_BATCH_FAIL = '[Batch] Delete Batch Fail',
}

export const CreateBatch = createAction(
    BatchActionType.CREATE_BATCH,
    props<{ batch: DIMBatch }>()
);

export const SetSelectedBatch = createAction(
    BatchActionType.SET_SELECTED_BATCH,
    props<{ batch: DIMBatch }>()
);

export const CreateBatchSuccess = createAction(
    BatchActionType.CREATE_BATCH_SUCCESS,
    props<{
        response: HTTPResponse;
        batch: DIMBatch;
    }>()
);

export const CreateBatchFail = createAction(
    BatchActionType.CREATE_BATCH_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const UpdateBatch = createAction(
    BatchActionType.UPDATE_BATCH,
    props<{ batch: DIMBatch }>()
);

export const UpdateBatchSuccess = createAction(
    BatchActionType.UPDATE_BATCH_SUCCESS,
    props<{ batch: Update<DIMBatch>; payload: DIMBatch }>()
);

export const UpdateBatchFail = createAction(
    BatchActionType.UPDATE_BATCH_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const LoadBatches = createAction(BatchActionType.LOAD_BATCHES);

export const LoadBatchesSuccess = createAction(
    BatchActionType.LOAD_BATCHES_SUCCESS,
    props<{ batches: Array<DIMBatch> }>()
);

export const LoadBatchesFail = createAction(
    BatchActionType.LOAD_BATCHES_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const DeleteBatch = createAction(
    BatchActionType.DELETE_BATCH,
    props<{ batch: DIMBatch }>()
);

export const DeleteBatchSuccess = createAction(
    BatchActionType.DELETE_BATCH_SUCCESS,
    props<{ response: HTTPResponse; payload: DIMBatch }>()
);

export const DeleteBatchFail = createAction(
    BatchActionType.DELETE_BATCH_FAIL,
    props<{ error: HTTPErrorMessage }>()
);
