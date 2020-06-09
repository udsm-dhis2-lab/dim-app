import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../states/app.state';

export const initialRouterState: any = {
  state: { url: '/', params: {}, queryParams: {} },
  navigationId: -1,
};

export const selectRouter = createFeatureSelector<AppState, RouterReducerState>(
  'router'
);

