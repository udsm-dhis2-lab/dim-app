/**
 *
 */
import { createReducer, Action, on } from '@ngrx/store';
import { initialBatchState, BatchState, batchAdapter } from './batch.state';
import {
    SetSelectedBatch,
    CreateBatchSuccess,
    CreateBatchFail,
    UpdateBatchSuccess,
    UpdateBatchFail,
    LoadBatchesSuccess,
    DeleteBatchSuccess,
    DeleteBatchFail,
    LoadBatchesFail,
} from './batch.action';

/**
 *
 */
const mBatchReducer = createReducer(
    initialBatchState,
    on(SetSelectedBatch, (state: BatchState, { batch }) => ({
        ...state,
        selectedBatch: batch,
    })),
    on(CreateBatchSuccess, (state: BatchState, { response, batch }) => {
        return batchAdapter.addOne(batch, {
            ...state,
            created: true,
            response,
            batch,
        });
    }),
    on(CreateBatchFail, (state: BatchState, { error }) => ({
        ...state,
        created: false,
        error,
    })),
    on(UpdateBatchSuccess, (state: BatchState, { batch, payload }) => {
        return batchAdapter.updateOne(batch, {
            ...state,
            loaded: false,
            loading: false,
            edited: true,
            selectedBatchId: payload?.id,
            batch: payload,
        });
    }),
    on(UpdateBatchFail, (state: BatchState, { error }) => ({
        ...state,
        selectedBatchId: null,
        edited: false,
        error,
    })),
    on(LoadBatchesSuccess, (state: BatchState, { batches }) => {
        return batchAdapter.setAll(batches, {
            ...state,
            loading: false,
            loaded: true,
        });
    }),
    on(LoadBatchesFail, (state: BatchState, { error }) => ({
        ...state,
        entities: {},
        error,
    })),
    on(DeleteBatchSuccess, (state: BatchState, { response, payload }) => {
        return batchAdapter.removeOne(payload?.id, {
            ...state,
            deleted: true,
        });
    }),
    on(DeleteBatchFail, (state: BatchState, { error }) => ({
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
export function _BatchReducer(state: BatchState | undefined, action: Action) {
    /**
     *
     */
    return mBatchReducer(state, action);
}
