/**
 *
 */
import { createAction, props } from '@ngrx/store';

/**
 *
 */
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { Update } from '@ngrx/entity';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMIntegration } from '../models/integration.model';

/**
 *
 */
export enum IntegrationActionType {
    SET_SELECTED_INTEGRATION = '[Integration] Set Selected Integration',
    CREATE_INTEGRATION = '[Integration] Create Integration',
    CREATE_INTEGRATION_SUCCESS = '[Integration] Create Integration Success',
    CREATE_INTEGRATION_FAIL = '[Integration] Create Integration Fail',
    UPDATE_INTEGRATION = '[Integration] Update Integration',
    UPDATE_INTEGRATION_SUCCESS = '[Integration] Update Integration Success',
    UPDATE_INTEGRATION_FAIL = '[Integration] Update Integration Fail',
    LOAD_INTEGRATIONS = '[Integration] Load Integrations',
    LOAD_INTEGRATIONS_SUCCESS = '[Integration] Load Integrations Success',
    LOAD_INTEGRATIONS_FAIL = '[Integration] Load Integrations Fail',
    DELETE_INTEGRATION = '[Integration] Delete Integration',
    DELETE_INTEGRATION_SUCCESS = '[Integration] Delete Integration Success',
    DELETE_INTEGRATION_FAIL = '[Integration] Delete Integration Fail',
}

export const CreateIntegration = createAction(
    IntegrationActionType.CREATE_INTEGRATION,
    props<{ integration: DIMIntegration }>()
);

export const SetSelectedIntegration = createAction(
    IntegrationActionType.SET_SELECTED_INTEGRATION,
    props<{ integration: DIMIntegration }>()
);

export const CreateIntegrationSuccess = createAction(
    IntegrationActionType.CREATE_INTEGRATION_SUCCESS,
    props<{
        response: HTTPResponse;
        integration: DIMIntegration;
    }>()
);

export const CreateIntegrationFail = createAction(
    IntegrationActionType.CREATE_INTEGRATION_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const UpdateIntegration = createAction(
    IntegrationActionType.UPDATE_INTEGRATION,
    props<{ integration: DIMIntegration }>()
);

export const UpdateIntegrationSuccess = createAction(
    IntegrationActionType.UPDATE_INTEGRATION_SUCCESS,
    props<{ integration: Update<DIMIntegration>; payload: DIMIntegration }>()
);

export const UpdateIntegrationFail = createAction(
    IntegrationActionType.UPDATE_INTEGRATION_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const LoadIntegrations = createAction(
    IntegrationActionType.LOAD_INTEGRATIONS
);

export const LoadIntegrationsSuccess = createAction(
    IntegrationActionType.LOAD_INTEGRATIONS_SUCCESS,
    props<{ integrations: Array<DIMIntegration> }>()
);

export const LoadIntegrationsFail = createAction(
    IntegrationActionType.LOAD_INTEGRATIONS_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const DeleteIntegration = createAction(
    IntegrationActionType.DELETE_INTEGRATION,
    props<{ integration: DIMIntegration }>()
);

export const DeleteIntegrationSuccess = createAction(
    IntegrationActionType.DELETE_INTEGRATION_SUCCESS,
    props<{ response: HTTPResponse; payload: DIMIntegration }>()
);

export const DeleteIntegrationFail = createAction(
    IntegrationActionType.DELETE_INTEGRATION_FAIL,
    props<{ error: HTTPErrorMessage }>()
);
