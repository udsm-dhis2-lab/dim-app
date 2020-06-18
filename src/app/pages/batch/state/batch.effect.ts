/**
 *
 */
import { Injectable } from '@angular/core';
/**
 *
 */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
/**
 *
 */
import * as _ from 'lodash';

import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { BatchService } from '../services/batch.service';
import {
    BatchActionType,
    CreateBatchSuccess,
    CreateBatchFail,
    LoadBatchesSuccess,
    LoadBatchesFail,
    UpdateBatchSuccess,
    UpdateBatchFail,
    DeleteBatchSuccess,
    DeleteBatchFail,
} from './batch.action';
import { DIMBatch } from '../models/batch.model';

@Injectable()
export class BatchEffects {
    constructor(private actions$: Actions, private batchService: BatchService) { }

    /**
     *
     */
    createBatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BatchActionType.CREATE_BATCH),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { batch: DIMBatch }) =>
                this.batchService.createBatch(payload).pipe(
                    map((response: HTTPResponse) =>
                        CreateBatchSuccess({
                            response,
                            batch: payload?.batch,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(CreateBatchFail({ error }))
                    )
                )
            )
        )
    );

    /**
     *
     */
    loadBatches$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BatchActionType.LOAD_BATCHES),
            switchMap(() =>
                this.batchService.getBatches().pipe(
                    map((batches: Array<DIMBatch>) => LoadBatchesSuccess({ batches })),
                    catchError((error: any) => of(LoadBatchesFail({ error })))
                )
            )
        )
    );

    updateBatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BatchActionType.UPDATE_BATCH),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { batch: DIMBatch }) =>
                this.batchService.updateBatch(payload).pipe(
                    map((response: any) =>
                        UpdateBatchSuccess({
                            batch: {
                                id: payload?.batch?.id,
                                changes: payload?.batch,
                            },
                            payload: payload?.batch,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(UpdateBatchFail({ error }))
                    )
                )
            )
        )
    );

    deleteBatch$ = createEffect(() =>
        this.actions$.pipe(
            ofType(BatchActionType.DELETE_BATCH),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { batch: DIMBatch }) =>
                this.batchService.deleteBatch(payload).pipe(
                    map((response: HTTPResponse) =>
                        DeleteBatchSuccess({
                            response,
                            payload: payload.batch,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(DeleteBatchFail({ error }))
                    )
                )
            )
        )
    );
}
