/**
 *
 */
import { createReducer, Action, on } from '@ngrx/store';
import {
    initialIntegrationState,
    IntegrationState,
    integrationAdapter,
} from './integration.state';
import {
    SetSelectedIntegration,
    CreateIntegrationSuccess,
    CreateIntegrationFail,
    UpdateIntegrationSuccess,
    UpdateIntegrationFail,
    LoadIntegrationsSuccess,
    LoadIntegrationsFail,
    DeleteIntegrationSuccess,
    DeleteIntegrationFail,
} from './integration.action';
/**
 *
 */
const mIntegrationReducer = createReducer(
    initialIntegrationState,
    on(SetSelectedIntegration, (state: IntegrationState, { integration }) => ({
        ...state,
        selectedIntegration: integration,
    })),
    on(
        CreateIntegrationSuccess,
        (state: IntegrationState, { response, integration }) => {
            return integrationAdapter.addOne(integration, {
                ...state,
                created: true,
                response,
                integration,
            });
        }
    ),
    on(CreateIntegrationFail, (state: IntegrationState, { error }) => ({
        ...state,
        created: false,
        error,
    })),
    on(
        UpdateIntegrationSuccess,
        (state: IntegrationState, { integration, payload }) => {
            return integrationAdapter.updateOne(integration, {
                ...state,
                loaded: false,
                loading: false,
                edited: true,
                selectedIntegrationId: payload?.id,
                integration: payload,
            });
        }
    ),
    on(UpdateIntegrationFail, (state: IntegrationState, { error }) => ({
        ...state,
        selectedIntegrationId: null,
        edited: false,
        error,
    })),
    on(LoadIntegrationsSuccess, (state: IntegrationState, { integrations }) => {
        return integrationAdapter.setAll(integrations, {
            ...state,
            loading: false,
            loaded: true,
        });
    }),
    on(LoadIntegrationsFail, (state: IntegrationState, { error }) => ({
        ...state,
        entities: {},
        error,
    })),
    on(
        DeleteIntegrationSuccess,
        (state: IntegrationState, { response, payload }) => {
            return integrationAdapter.removeOne(payload?.id, {
                ...state,
                deleted: true,
            });
        }
    ),
    on(DeleteIntegrationFail, (state: IntegrationState, { error }) => ({
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
export function _IntegrationReducer(
    state: IntegrationState | undefined,
    action: Action
) {
    /**
     *
     */
    return mIntegrationReducer(state, action);
}
