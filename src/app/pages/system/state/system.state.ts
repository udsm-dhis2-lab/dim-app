/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMSystem } from '../models/system.model';
/**
 *
 */
export interface SystemState extends EntityState<DIMSystem> {
    selectedSystemId: string | number | null;
    selectedSystem: DIMSystem;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    system: DIMSystem;
}

/**
 *
 */
export const systemAdapter: EntityAdapter<DIMSystem> = createEntityAdapter<
    DIMSystem
>();

/**
 *
 */
export const defaultSystemIntegration: SystemState = {
    ids: [],
    entities: {},
    selectedSystemId: null,
    selectedSystem: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    system: null,
};

/**
 *
 */
export const initialSystemState = systemAdapter.getInitialState(
    defaultSystemIntegration
);
