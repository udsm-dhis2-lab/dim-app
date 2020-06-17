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
import { Update } from '@ngrx/entity';

/**
 *
 */
export enum SystemActionType {
    SET_SELECTED_SYSTEM = '[Integration:System] Set Selected System',
    CREATE_SYSTEM = '[Integration:System] Create System',
    CREATE_SYSTEM_SUCCESS = '[Integration:System] Create System Success',
    CREATE_SYSTEM_FAIL = '[Integration:System] Create System Fail',
    UPDATE_SYSTEM = '[Integration:Update System] Update System',
    UPDATE_UPDATE_SUCCESS = '[Integration:Update System] Update System Success',
    UPDATE_UPDATE_FAIL = '[Integration:Update System] Update System Fail',
    LOAD_SYSTEMS = '[Integration:System] Load Systems',
    LOAD_SYSTEMS_SUCCESS = '[Integration:System] Load Systems Success',
    LOAD_SYSTEMS_FAIL = '[Integration:System] Load Systems Fail',
}

/**
 *
 */
export const CreateSystem = createAction(
    SystemActionType.CREATE_SYSTEM,
    props<{ system: DIMSystem }>()
);

/**
 *
 */
export const SetSelectedSystem = createAction(
    SystemActionType.SET_SELECTED_SYSTEM,
    props<{ system: DIMSystem }>()
);

/**
 *
 */
export const CreateSystemSuccess = createAction(
    SystemActionType.CREATE_SYSTEM_SUCCESS,
    props<{
        response: HTTPSuccessResponse;
        system: DIMSystem;
    }>()
);

export const UpdateSystem = createAction(
    SystemActionType.UPDATE_SYSTEM,
    props<{ system: DIMSystem }>()
);

export const UpdateSystemSuccess = createAction(
    SystemActionType.UPDATE_UPDATE_SUCCESS,
    props<{ system: Update<DIMSystem>; payload: DIMSystem }>()
);

export const UpdateSystemFail = createAction(
    SystemActionType.UPDATE_UPDATE_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

/**
 *
 */
export const CreateSystemFail = createAction(
    SystemActionType.CREATE_SYSTEM_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const LoadSystems = createAction(SystemActionType.LOAD_SYSTEMS);

export const LoadSystemsSuccess = createAction(
    SystemActionType.LOAD_SYSTEMS_SUCCESS,
    props<{ systems: Array<DIMSystem> }>()
);

export const LoadSystemsFail = createAction(
    SystemActionType.LOAD_SYSTEMS_FAIL,
    props<{ error: HTTPErrorMessage }>()
);
