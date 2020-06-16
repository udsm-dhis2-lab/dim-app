/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DIMSystem } from '../../home/models/integration.model';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPSuccessResponse } from '../../home/models/http-response.model';
/**
 *
 */
export interface SystemState extends EntityState<DIMSystem> {
    selectedSystemId: string | number | null;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPSuccessResponse;
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
export const initialSystemIntegrationState = systemAdapter.getInitialState(
    defaultSystemIntegration
);
