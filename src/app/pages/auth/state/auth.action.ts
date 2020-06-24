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
import { DIMAuth } from '../models/auth.model';

/**
 *
 */
export enum AuthActionType {
    SET_SELECTED_AUTH = '[Auth] Set Selected Auth',
    CREATE_AUTH = '[Auth] Create Auth',
    CREATE_AUTH_SUCCESS = '[Auth] Create Auth Success',
    CREATE_AUTH_FAIL = '[Auth] Create Auth Fail',
    UPDATE_AUTH = '[Auth] Update Auth',
    UPDATE_AUTH_SUCCESS = '[Auth] Update Auth Success',
    UPDATE_AUTH_FAIL = '[Auth] Update Auth Fail',
    LOAD_AUTHS = '[Auth] Load Auths',
    LOAD_AUTHS_SUCCESS = '[Auth] Load Auths Success',
    LOAD_AUTHS_FAIL = '[Auth] Load Auths Fail',
    DELETE_AUTH = '[Auth] Delete Auth',
    DELETE_AUTH_SUCCESS = '[Auth] Delete Auth Success',
    DELETE_AUTH_FAIL = '[Auth] Delete Auth Fail',
}

export const CreateAuth = createAction(
    AuthActionType.CREATE_AUTH,
    props<{ auth: DIMAuth }>()
);

export const SetSelectedAuth = createAction(
    AuthActionType.SET_SELECTED_AUTH,
    props<{ auth: DIMAuth }>()
);

export const CreateAuthSuccess = createAction(
    AuthActionType.CREATE_AUTH_SUCCESS,
    props<{
        response: HTTPResponse;
        auth: DIMAuth;
    }>()
);

export const CreateAuthFail = createAction(
    AuthActionType.CREATE_AUTH_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const UpdateAuth = createAction(
    AuthActionType.UPDATE_AUTH,
    props<{ auth: DIMAuth }>()
);

export const UpdateAuthSuccess = createAction(
    AuthActionType.UPDATE_AUTH_SUCCESS,
    props<{ auth: Update<DIMAuth>; payload: DIMAuth }>()
);

export const UpdateAuthFail = createAction(
    AuthActionType.UPDATE_AUTH_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const LoadAuths = createAction(AuthActionType.LOAD_AUTHS);

export const LoadAuthsSuccess = createAction(
    AuthActionType.LOAD_AUTHS_SUCCESS,
    props<{ auths: Array<DIMAuth> }>()
);

export const LoadAuthsFail = createAction(
    AuthActionType.LOAD_AUTHS_FAIL,
    props<{ error: HTTPErrorMessage }>()
);

export const DeleteAuth = createAction(
    AuthActionType.DELETE_AUTH,
    props<{ auth: DIMAuth }>()
);

export const DeleteAuthSuccess = createAction(
    AuthActionType.DELETE_AUTH_SUCCESS,
    props<{ response: HTTPResponse; payload: DIMAuth }>()
);

export const DeleteAuthFail = createAction(
    AuthActionType.DELETE_AUTH_FAIL,
    props<{ error: HTTPErrorMessage }>()
);
