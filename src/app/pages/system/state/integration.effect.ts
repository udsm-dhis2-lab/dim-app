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
    CreateDIMSystemSuccess,
    CreateDIMSystemFail,
} from './integration.action';
import { DIMSystem } from '../../home/models/integration.model';
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
            ofType(SystemIntegrationActionType.CREATE_SYSTEM),
            map((payload: any) => _.omit(payload, ['type'])),
            switchMap((payload: { [key: string]: DIMSystem }) =>
                this.systemService.createSystemIntegration(payload).pipe(
                    map((response: HTTPSuccessResponse) => {
                        return CreateDIMSystemSuccess({
                            response,
                            system: payload?.system,
                        });
                    }),
                    catchError((error: HTTPErrorMessage) =>
                        of(CreateDIMSystemFail({ error }))
                    )
                )
            )
        )
    );
}
