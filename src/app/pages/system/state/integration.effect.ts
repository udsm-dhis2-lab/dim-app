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
    SystemIntegrationActionType,
    CreateSystemIntegrationSuccess,
    CreateSystemIntegrationFail,
} from './integration.action';
import { SystemIntegration } from '../../home/models/integration.model';
import { HTTPSuccessResponse } from '../../home/models/http-response.model';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { SystemService } from '../services/system.service';

@Injectable()
export class SystemIntegrationEffects {
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
    createSystemIntegration$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SystemIntegrationActionType.CREATE_SYS_INTEGRATION),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { [key: string]: SystemIntegration }) =>
                this.systemService.createSystemIntegration(payload).pipe(
                    map((response: HTTPSuccessResponse) => {
                        const systemIntegration = payload?.systemIntegration;
                        return CreateSystemIntegrationSuccess({
                            response,
                            systemIntegration,
                        });
                    }),
                    catchError((error: HTTPErrorMessage) =>
                        of(CreateSystemIntegrationFail({ error }))
                    )
                )
            )
        )
    );
}
