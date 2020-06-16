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
    CreateDIMSystemSuccess,
    CreateDIMSystemFail,
} from './integration.action';

/**
 *
 */
const mSystemIntegrationReducer = createReducer(
    initialSystemIntegrationState,
    on(
        CreateDIMSystemSuccess,
        (state: SystemIntegrationState, { response, system }) => {
            return systemIntegrationAdapter.addOne(system, {
                ...state,
                created: true,
                response,
                system,
            });
        }
    ),
    on(CreateDIMSystemFail, (state: SystemIntegrationState, { error }) => ({
        ...state,
        created: false,
        error,
    }))
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
