/**
 *
 */
import { createReducer, Action, on } from '@ngrx/store';
import { initialAuthState, AuthState, authAdapter } from './auth.state';
import {
    SetSelectedAuth,
    CreateAuthSuccess,
    CreateAuthFail,
    UpdateAuthSuccess,
    UpdateAuthFail,
    LoadAuthsSuccess,
    LoadAuthsFail,
    DeleteAuthSuccess,
    DeleteAuthFail,
} from './auth.action';

/**
 *
 */
const mAuthReducer = createReducer(
    initialAuthState,
    on(SetSelectedAuth, (state: AuthState, { auth }) => ({
        ...state,
        selectedAuth: auth,
    })),
    on(CreateAuthSuccess, (state: AuthState, { response, auth }) => {
        return authAdapter.addOne(auth, {
            ...state,
            created: true,
            error: null,
            response,
            auth,
        });
    }),
    on(CreateAuthFail, (state: AuthState, { error }) => ({
        ...state,
        created: false,
        error,
    })),
    on(UpdateAuthSuccess, (state: AuthState, { auth, payload }) => {
        return authAdapter.updateOne(auth, {
            ...state,
            loaded: false,
            loading: false,
            edited: true,
            selectedAuthId: payload?.id,
            auth: payload,
        });
    }),
    on(UpdateAuthFail, (state: AuthState, { error }) => ({
        ...state,
        selectedAuthId: null,
        edited: false,
        error,
    })),
    on(LoadAuthsSuccess, (state: AuthState, { auths }) => {
        return authAdapter.setAll(auths, {
            ...state,
            loading: false,
            loaded: true,
            edited: false,
            error: null,
        });
    }),
    on(LoadAuthsFail, (state: AuthState, { error }) => ({
        ...state,
        entities: {},
        error,
    })),
    on(DeleteAuthSuccess, (state: AuthState, { response, payload }) => {
        return authAdapter.removeOne(payload?.id, {
            ...state,
            deleted: true,
            error: null,
        });
    }),
    on(DeleteAuthFail, (state: AuthState, { error }) => ({
        ...state,
        deleted: false,
        error,
    }))
);
/**
 *
 * @state
 * @action
 */
export function _AuthReducer(state: AuthState | undefined, action: Action) {
    /**
     *
     */
    return mAuthReducer(state, action);
}
