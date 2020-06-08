/**
 *
 */
import { createReducer, Action, on } from '@ngrx/store';
/**
 *
 */
import {
    SystemIntegrationState,
    initialSystemIntegrationState,
    systemIntegrationAdapter,
} from './integration.state';
/**
 *
 */
import {
    CreateSystemIntegrationSuccess,
    CreateSystemIntegrationFail,
} from './integration.action';

/**
 *
 */
const mSystemIntegrationReducer = createReducer(
    initialSystemIntegrationState,
    on(
        CreateSystemIntegrationSuccess,
        (state: SystemIntegrationState, { response, systemIntegration }) => {
            return systemIntegrationAdapter.addOne(systemIntegration, {
                ...state,
                created: true,
                response,
                systemIntegration,
            });
        }
    ),
    on(
        CreateSystemIntegrationFail,
        (state: SystemIntegrationState, { error }) => ({
            ...state,
            created: false,
            error,
        })
    )
);
/**
 *
 * @state
 * @action
 */
export function _SystemIntegrationReducer(
    state: SystemIntegrationState | undefined,
    action: Action
) {
    /**
     *
     */
    return mSystemIntegrationReducer(state, action);
}
