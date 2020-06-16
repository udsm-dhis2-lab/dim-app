/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { SystemIntegration } from '../../home/models/integration.model';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPSuccessResponse } from '../../home/models/http-response.model';
/**
 *
 */
export interface SystemIntegrationState extends EntityState<SystemIntegration> {
    selectedSystemIntegrationId: string | number | null;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPSuccessResponse;
    systemIntegration: SystemIntegration;
}

/**
 *
 */
export const systemIntegrationAdapter: EntityAdapter<SystemIntegration> = createEntityAdapter<
    SystemIntegration
>();

/**
 *
 */
export const defaultSystemIntegration: SystemIntegrationState = {
    ids: [],
    entities: {},
    selectedSystemIntegrationId: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    systemIntegration: null
};

/**
 *
 */
export const initialSystemIntegrationState = systemIntegrationAdapter.getInitialState(
    defaultSystemIntegration
);
