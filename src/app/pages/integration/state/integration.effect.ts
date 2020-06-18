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
    IntegrationActionType,
    CreateIntegrationSuccess,
    CreateIntegrationFail,
    LoadIntegrationsSuccess,
    LoadIntegrationsFail,
    UpdateIntegrationSuccess,
    UpdateIntegrationFail,
    DeleteIntegrationSuccess,
    DeleteIntegrationFail,
} from './integration.action';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { IntegrationService } from '../services/integration.service';
import { DIMIntegration } from '../models/integration.model';

@Injectable()
export class IntegrationEffects {
    /**
     *
     * @actions$
     * @reportsService
     */
    constructor(
        private actions$: Actions,
        private integrationService: IntegrationService
    ) { }

    /**
     *
     */
    createIntegration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IntegrationActionType.CREATE_INTEGRATION),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { integration: DIMIntegration }) =>
                this.integrationService.createIntegration(payload).pipe(
                    map((response: HTTPResponse) =>
                        CreateIntegrationSuccess({
                            response,
                            integration: payload?.integration,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(CreateIntegrationFail({ error }))
                    )
                )
            )
        )
    );

    /**
     *
     */
    loadIntegration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IntegrationActionType.LOAD_INTEGRATIONS),
            switchMap(() =>
                this.integrationService.getIntegrations().pipe(
                    map((integrations: Array<DIMIntegration>) =>
                        LoadIntegrationsSuccess({ integrations })
                    ),
                    catchError((error: any) => of(LoadIntegrationsFail({ error })))
                )
            )
        )
    );

    updateIntegration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IntegrationActionType.UPDATE_INTEGRATION),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { integration: DIMIntegration }) =>
                this.integrationService.updateIntegration(payload).pipe(
                    map((response: any) =>
                        UpdateIntegrationSuccess({
                            integration: {
                                id: payload?.integration?.id,
                                changes: payload?.integration,
                            },
                            payload: payload?.integration,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(UpdateIntegrationFail({ error }))
                    )
                )
            )
        )
    );

    deleteIntegration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(IntegrationActionType.DELETE_INTEGRATION),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { integration: DIMIntegration }) =>
                this.integrationService.deleteIntegration(payload).pipe(
                    map((response: HTTPResponse) =>
                        DeleteIntegrationSuccess({
                            response,
                            payload: payload.integration,
                        })
                    ),
                    catchError((error: HTTPErrorMessage) =>
                        of(DeleteIntegrationFail({ error }))
                    )
                )
            )
        )
    );
}
