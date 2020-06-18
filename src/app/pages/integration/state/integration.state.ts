/**
 *
 */
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { HTTPResponse } from 'src/app/shared/models/http-response.model';
import { DIMIntegration } from '../models/integration.model';
/**
 *
 */
export interface IntegrationState extends EntityState<DIMIntegration> {
    selectedIntegrationId: string | number | null;
    selectedIntegration: DIMIntegration;
    loading: boolean;
    loaded: boolean;
    editing: boolean;
    edited: boolean;
    deleted: boolean;
    created: boolean;
    error: HTTPErrorMessage | null;
    response: HTTPResponse;
    integration: DIMIntegration;
}

/**
 *
 */
export const integrationAdapter: EntityAdapter<DIMIntegration> = createEntityAdapter<
    DIMIntegration
>();

/**
 *
 */
export const defaultIntegrationState: IntegrationState = {
    ids: [],
    entities: {},
    selectedIntegrationId: null,
    selectedIntegration: null,
    loaded: false,
    loading: false,
    editing: false,
    edited: false,
    deleted: false,
    created: false,
    error: null,
    response: null,
    integration: null,
};

/**
 *
 */
export const initialIntegrationState = integrationAdapter.getInitialState(
    defaultIntegrationState
);
