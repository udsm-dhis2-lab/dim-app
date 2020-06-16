/**
 *
 */
import { createAction, props } from '@ngrx/store';

/**
 *
 */
import { DIMSystem } from '../../home/models/integration.model';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPSuccessResponse } from '../../home/models/http-response.model';

/**
 *
 */
export enum SystemIntegrationActionType {
    CREATE_SYSTEM = '[Integration:Create] Create System',
    CREATE_SYSTEM_SUCCESS = '[Integration:Create] System Success',
    CREATE_SYSTEM_FAIL = '[Integration:Create] Load System Fail',
}

/**
 *
 */
export const CreateDIMSystem = createAction(
    SystemIntegrationActionType.CREATE_SYSTEM,
    props<{ system: DIMSystem }>()
);

/**
 *
 */
export const CreateDIMSystemSuccess = createAction(
    SystemIntegrationActionType.CREATE_SYSTEM_SUCCESS,
    props<{
        response: HTTPSuccessResponse;
        system: DIMSystem;
    }>()
);

/**
 *
 */
export const CreateDIMSystemFail = createAction(
    SystemIntegrationActionType.CREATE_SYSTEM_FAIL,
    props<{ error: HTTPErrorMessage }>()
);
