/**
 *
 */
import { createReducer, Action, on } from '@ngrx/store';
/**
 *
 */
import { SystemState, initialSystemState, systemAdapter } from './system.state';
/**
 *
 */
import {
    CreateSystemSuccess,
    CreateSystemFail,
    LoadSystemsSuccess,
    LoadSystemsFail,
    SetSelectedSystem,
    UpdateSystemSuccess,
    UpdateSystemFail,
    DeleteSystemSuccess,
    DeleteSystemFail,
} from './system.action';

/**
 *
 */
const mSystemReducer = createReducer(
    initialSystemState,
    on(SetSelectedSystem, (state: SystemState, { system }) => ({
        ...state,
        selectedSystem: system,
    })),
    on(CreateSystemSuccess, (state: SystemState, { response, system }) => {
        return systemAdapter.addOne(system, {
            ...state,
            created: true,
            response,
            system,
        });
    }),
    on(CreateSystemFail, (state: SystemState, { error }) => ({
        ...state,
        created: false,
        error,
    })),
    on(UpdateSystemSuccess, (state: SystemState, { system, payload }) => {
        return systemAdapter.updateOne(system, {
            ...state,
            loaded: false,
            loading: false,
            edited: true,
            selectedSystemId: payload?.id,
            system: payload,
        });
    }),
    on(UpdateSystemFail, (state: SystemState, { error }) => ({
        ...state,
        selectedSystemId: null,
        edited: false,
        error,
    })),
    on(LoadSystemsSuccess, (state: SystemState, { systems }) => {
        return systemAdapter.setAll(systems, {
            ...state,
            loading: false,
            loaded: true,
        });
    }),
    on(LoadSystemsFail, (state: SystemState, { error }) => ({
        ...state,
        entities: {},
        error,
    })),
    on(DeleteSystemSuccess, (state: SystemState, { response, payload }) => {
        return systemAdapter.removeOne(payload?.id, {
            ...state,
            deleted: true,
        });
    }),
    on(DeleteSystemFail, (state: SystemState, { error }) => ({
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
export function _SystemReducer(state: SystemState | undefined, action: Action) {
    /**
     *
     */
    return mSystemReducer(state, action);
}
