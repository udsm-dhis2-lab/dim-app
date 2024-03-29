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
import {
    SystemActionType,
    CreateSystemSuccess,
    CreateSystemFail,
    LoadSystemsSuccess,
    LoadSystemsFail,
    UpdateSystemSuccess,
    UpdateSystemFail,
    DeleteSystemSuccess,
    DeleteSystemFail,
} from './system.action';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { SystemService } from '../services/system.service';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMSystem } from '../models/system.model';

@Injectable()
export class SystemEffects {
    /**
     *
     * @actions$
     * @reportsService
     */
    constructor(
        private actions$: Actions,
        private systemService: SystemService
    ) { }

    /**
     *
     */
    createSystem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemActionType.CREATE_SYSTEM),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { system: DIMSystem }) =>
                this.systemService.createSystem(payload).pipe(
                    map((response: HTTPResponse) =>
                        CreateSystemSuccess({
                            response,
                            system: payload?.system,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(CreateSystemFail({ error }))
                    )
                )
            )
        )
    );

    /**
     *
     */
    loadSystems$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemActionType.LOAD_SYSTEMS),
            switchMap(() =>
                this.systemService.getSystems().pipe(
                    map((systems: Array<DIMSystem>) => LoadSystemsSuccess({ systems })),
                    catchError((error: any) => of(LoadSystemsFail({ error })))
                )
            )
        )
    );

    updateSystem$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemActionType.UPDATE_SYSTEM),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((formPayload: { [key: string]: DIMSystem }) =>
                this.systemService.updateSystem(formPayload).pipe(
                    map((response: any) =>
                        UpdateSystemSuccess({
                            system: {
                                id: formPayload?.system?.id,
                                changes: formPayload?.system,
                            },
                            payload: formPayload?.system,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(UpdateSystemFail({ error }))
                    )
                )
            )
        )
    );

    deleteforms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemActionType.DELETE_SYSTEM),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { [key: string]: DIMSystem }) =>
                this.systemService.deleteSystem(payload).pipe(
                    map((response: HTTPResponse) =>
                        DeleteSystemSuccess({
                            response,
                            payload: payload.system,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(DeleteSystemFail({ error }))
                    )
                )
            )
        )
    );
}
