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
import { SystemIntegrationService } from '../services/system-integration.service';
import {
    SystemIntegrationActionType,
    CreateSystemIntegrationSuccess,
    CreateSystemIntegrationFail,
} from './integration.action';
import { SystemIntegration } from '../models/integration.model';
import { HTTPSuccessResponse } from '../models/http-response.model';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';

@Injectable()
export class SystemIntegrationEffects {
    /**
     *
     * @actions$
     * @reportsService
     */
    constructor(
        private actions$: Actions,
        private systemIntegrationService: SystemIntegrationService
    ) { }

    /**
     *
     */
    createSystemIntegration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemIntegrationActionType.CREATE_SYS_INTEGRATION),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((systemIntegration: SystemIntegration) =>
                this.systemIntegrationService
                    .createSystemIntegration(systemIntegration)
                    .pipe(
                        map((response: HTTPSuccessResponse) =>
                            CreateSystemIntegrationSuccess({
                                response,
                            })
                        ),
                        catchError((error: HTTPErrorMessage) =>
                            of(CreateSystemIntegrationFail({ error }))
                        )
                    )
            )
        )
    );
}
