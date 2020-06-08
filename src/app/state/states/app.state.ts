/**
 *
 */
import { MetaReducer, ActionReducerMap } from '@ngrx/store';
/**
 *
 */
import * as fromSystemIntegrationStore from '../../pages/home/state';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze';
import { UserState, initialUserState } from './user.state';
import { SystemInfoState, initialSystemInfoState } from './system-info.state';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { userReducer } from '../reducers/user.reducer';
import { systemInfoReducer } from '../reducers/system-info.reducer';
import { UserEffects } from '../effects/user.effects';
import { SystemInfoEffects } from '../effects/system-info.effects';
import { RouterEffects } from '../effects/router.effects';
import { initialRouterState } from '../selectors/router.selectors';

/**
 *
 */
export interface AppState {
    /**
     *
     */
    systemIntegrations: fromSystemIntegrationStore.SystemIntegrationState;
    user: UserState;
    systemInfo: SystemInfoState;
    router: RouterReducerState;
}

/**
 *
 */
export const initialAppState: AppState = {
    /**
     *
     */
    systemIntegrations: fromSystemIntegrationStore.initialSystemIntegrationState,
    user: initialUserState,
    systemInfo: initialSystemInfoState,
    router: initialRouterState,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [storeFreeze]
    : [];

/**
 *
 */
export const reducers: ActionReducerMap<AppState> = {
    systemIntegrations: fromSystemIntegrationStore._SystemIntegrationReducer,
    user: userReducer,
    systemInfo: systemInfoReducer,
    router: routerReducer,
};

/**
 *
 */
export const appEffects: Array<any> = [
    fromSystemIntegrationStore.SystemIntegrationEffects,
    UserEffects,
    SystemInfoEffects,
    RouterEffects,
];

export const getAppRootState = (state: AppState) => state;
