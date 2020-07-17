/**
 *
 */
import { MetaReducer, ActionReducerMap } from '@ngrx/store';
/**
 *
 */
import * as fromSystemIntegrationStore from '../../pages/system/state';
import * as fromIntegrationState from '../../pages/integration/state';
import * as fromJobState from '../../pages/job/state';
import * as fromBatchState from '../../pages/batch/state';
import * as fromAuthState from '../../pages/auth/state';
import * as fromReportState from '../../pages/report/state';

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
    system: fromSystemIntegrationStore.SystemState;
    auth: fromAuthState.AuthState;
    integration: fromIntegrationState.IntegrationState;
    job: fromJobState.JobState;
    batch: fromBatchState.BatchState;
    report: fromReportState.ReportState;
    integratedSystem: fromReportState.IntegratedSystemState;
    user: UserState;
    dataSet: fromReportState.DatasetState;
    data: fromReportState.DataState;
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
    system: fromSystemIntegrationStore.initialSystemState,
    auth: fromAuthState.initialAuthState,
    integration: fromIntegrationState.initialIntegrationState,
    job: fromJobState.initialJobState,
    batch: fromBatchState.initialBatchState,
    report: fromReportState.initialReportState,
    integratedSystem: fromReportState.initialIntegratedSystemState,
    user: initialUserState,
    dataSet: fromReportState.initialDatasetState,
    data: fromReportState.initialDataState,
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
    system: fromSystemIntegrationStore._SystemReducer,
    auth: fromAuthState._AuthReducer,
    integration: fromIntegrationState._IntegrationReducer,
    job: fromJobState._JobReducer,
    batch: fromBatchState._BatchReducer,
    report: fromReportState._ReportReducer,
    integratedSystem: fromReportState._IntegratedSystemReducer,
    user: userReducer,
    dataSet: fromReportState._DatasetReducer,
    data: fromReportState._DataReducer,
    systemInfo: systemInfoReducer,
    router: routerReducer,
};

/**
 *
 */
export const appEffects: Array<any> = [
    fromSystemIntegrationStore.SystemEffects,
    fromIntegrationState.IntegrationEffects,
    fromJobState.JobEffects,
    fromBatchState.BatchEffects,
    fromAuthState.AuthEffects,
    fromReportState.ReportEffects,
    UserEffects,
    SystemInfoEffects,
    RouterEffects,
];

export const getAppRootState = (state: AppState) => state;
