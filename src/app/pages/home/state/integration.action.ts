/**
 *
 */
import { createAction, props } from '@ngrx/store';

/**
 *
 */
import { SystemIntegration } from '../models/integration.model';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPSuccessResponse } from '../models/http-response.model';

/**
 *
 */
export enum SystemIntegrationActionType {
    CREATE_SYS_INTEGRATION = '[Integration:Create] Create System Integration',
    CREATE_SYS_INTEGRATION_SUCCESS = '[Integration:Create] System Integration Success',
    CREATE_SYS_INTEGRATION_FAIL = '[Integration:Create] Load System Integration Fail',
}

/**
 *
 */
export const CreateReport = createAction(
    SystemIntegrationActionType.CREATE_SYS_INTEGRATION,
    props<{ systemIntegration: SystemIntegration }>()
);

/**
 *
 */
export const CreateReportSuccess = createAction(
    SystemIntegrationActionType.CREATE_SYS_INTEGRATION_SUCCESS,
    props<{ response: HTTPSuccessResponse }>()
);

/**
 *
 */
export const CreateReportFail = createAction(
    SystemIntegrationActionType.CREATE_SYS_INTEGRATION_FAIL,
    props<{ error: HTTPErrorMessage }>()
);