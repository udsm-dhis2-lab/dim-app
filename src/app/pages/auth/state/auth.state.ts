/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMAuth } from '../models/auth.model';
/**
 *
 */
export interface AuthState extends EntityState<DIMAuth> {
    selectedAuthId: string | number | null;
    selectedAuth: DIMAuth;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    auth: DIMAuth;
}

/**
 *
 */
export const authAdapter: EntityAdapter<DIMAuth> = createEntityAdapter<
    DIMAuth
>();

/**
 *
 */
export const defaultAuthState: AuthState = {
    ids: [],
    entities: {},
    selectedAuthId: null,
    selectedAuth: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    auth: null,
};

/**
 *
 */
export const initialAuthState = authAdapter.getInitialState(
    defaultAuthState
);
