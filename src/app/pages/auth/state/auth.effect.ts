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
import { AuthService } from '../services/auth.service';
import {
    AuthActionType,
    CreateAuthSuccess,
    CreateAuthFail,
    LoadAuthsSuccess,
    LoadAuthsFail,
    UpdateAuthSuccess,
    UpdateAuthFail,
    DeleteAuthSuccess,
    DeleteAuthFail,
} from './auth.action';
import { DIMAuth } from '../models/auth.model';

@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) { }

    /**
     *
     */
    createAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionType.CREATE_AUTH),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { auth: DIMAuth }) =>
                this.authService.createAuth(payload).pipe(
                    map((response: HTTPResponse) =>
                        CreateAuthSuccess({
                            response,
                            auth: payload?.auth,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) => of(CreateAuthFail({ error })))
                )
            )
        )
    );

    /**
     *
     */
    loadAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionType.LOAD_AUTHS),
            switchMap(() =>
                this.authService.getAuths().pipe(
                    map((auths: Array<DIMAuth>) => LoadAuthsSuccess({ auths: auths })),
                    catchError((error: any) => of(LoadAuthsFail({ error })))
                )
            )
        )
    );

    updateAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionType.UPDATE_AUTH),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { auth: DIMAuth }) =>
                this.authService.updateAuth(payload).pipe(
                    map((response: any) =>
                        UpdateAuthSuccess({
                            auth: {
                                id: payload?.auth?.id,
                                changes: payload?.auth,
                            },
                            payload: payload?.auth,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) => of(UpdateAuthFail({ error })))
                )
            )
        )
    );

    deleteAuth$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActionType.DELETE_AUTH),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { auth: DIMAuth }) =>
                this.authService.deleteAuth(payload).pipe(
                    map((response: HTTPResponse) =>
                        DeleteAuthSuccess({
                            response,
                            payload: payload.auth,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) => of(DeleteAuthFail({ error })))
                )
            )
        )
    );
}
