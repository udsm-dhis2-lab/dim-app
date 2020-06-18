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
/**
 *
 */
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { JobService } from '../services/job.service';
import { DIMJob } from '../models/job.model';
import {
    CreateJobSuccess,
    CreateJobFail,
    LoadJobsSuccess,
    LoadJobsFail,
    UpdateJobSuccess,
    UpdateJobFail,
    DeleteJobSuccess,
    DeleteJobFail,
    JobActionType,
} from './job.action';

@Injectable()
export class JobEffects {
    constructor(private actions$: Actions, private jobService: JobService) { }

    /**
     *
     */
    createJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobActionType.CREATE_JOB),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { job: DIMJob }) =>
                this.jobService.createJob(payload).pipe(
                    map((response: HTTPResponse) =>
                        CreateJobSuccess({
                            response,
                            job: payload?.job,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) => of(CreateJobFail({ error })))
                )
            )
        )
    );

    /**
     *
     */
    loadJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobActionType.LOAD_JOBS),
            switchMap(() =>
                this.jobService.getJobs().pipe(
                    map((jobs: Array<DIMJob>) => LoadJobsSuccess({ jobs })),
                    catchError((error: any) => of(LoadJobsFail({ error })))
                )
            )
        )
    );

    updateJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobActionType.UPDATE_JOB),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { job: DIMJob }) =>
                this.jobService.updateJob(payload).pipe(
                    map((response: any) =>
                        UpdateJobSuccess({
                            job: {
                                id: payload?.job?.id,
                                changes: payload?.job,
                            },
                            payload: payload?.job,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) => of(UpdateJobFail({ error })))
                )
            )
        )
    );

    deleteJob$ = createEffect(() =>
        this.actions$.pipe(
            ofType(JobActionType.DELETE_JOB),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { job: DIMJob }) =>
                this.jobService.deleteJob(payload).pipe(
                    map((response: HTTPResponse) =>
                        DeleteJobSuccess({
                            response,
                            payload: payload.job,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) => of(DeleteJobFail({ error })))
                )
            )
        )
    );
}
