import { createSelector } from '@ngrx/store';
import { UserState } from '../states/user.state';
import { User } from '@iapps/ngx-dhis2-http-client';
import { AppState, getAppRootState } from '../states/app.state';

export const getUserState = createSelector(
  getAppRootState,
  (state: AppState) => state.user
);

export const getCurrentUser = createSelector(
  getUserState,
  (state: UserState) => state.currentUser
);

export const getCurrentUserLoading = createSelector(
  getUserState,
  (state: UserState) => state.loading
);

export const getCurrentUserLoaded = createSelector(
  getUserState,
  (state: UserState) => state.loaded
);

export const getCurrentUserLoadingError = createSelector(
  getUserState,
  (state: UserState) => state.error
);

export const getCurrentUserManagementAuthoritiesStatus = createSelector(
  getCurrentUser,
  (currentUser: User) => {
    if (!currentUser) {
      return false;
    }

    return currentUser && currentUser.authorities
      ? currentUser.authorities.includes('ALL')
      : false;
  }
);
