import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { AppState } from 'src/app/state/states/app.state';
import { LoadSystems } from 'src/app/pages/system/state';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { DIMSystem } from 'src/app/pages/system/models/system.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthState, UpdateAuth } from '../../../state';
import { DIMAuth } from '../../../models/auth.model';
import {
  getSelectedAuth,
  getAuthEditedStatus,
  getAuthError,
} from '../../../state/auth.selector';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { SystemService } from 'src/app/pages/system/services/system.service';
import { getAllSystems } from 'src/app/pages/system/state/system.selector';
@Component({
  selector: 'app-edit-auth',
  templateUrl: './edit-auth.component.html',
  styleUrls: ['./edit-auth.component.scss'],
})
export class EditAuthComponent implements OnInit, OnDestroy {
  authFormEntries: DataEntryField = _.clone(_.create());
  systems: Array<DIMSystem | any>;
  systems$: Observable<Array<DIMSystem | any>>;
  user: User;
  isUpdating: boolean;
  updateAuthForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    from: new FormControl(''),
    authSecondarySystem: new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      to: new FormControl(''),
    }),
    createdAt: new FormControl(new Date()),
    lastUpdatedAt: new FormControl(new Date()),
  });

  subscriptions: Array<Subscription> = [];
  authFormSUB$: Subscription;
  authUpdatedSUB$: Subscription;
  updatedAuthSUB$: Subscription;
  selectedAuthSUB$: Subscription;
  errorSUB$: Subscription;
  systemsSUB$: Subscription;
  userSUB$: Subscription;
  batchesSUB$: Subscription;

  constructor(
    private authState: Store<AuthState>,
    private appState: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.appState.dispatch(LoadSystems());
    this.systems$ = this.appState.pipe(select(getAllSystems));
    this.systems$ = this.systemService.getSystems();
    this.selectedAuthSUB$ = this.authState
      .pipe(select(getSelectedAuth))
      .subscribe((auth: DIMAuth) => {
        this.updateAuthForm.patchValue(auth);
      });
    this.authFormSUB$ = this.updateAuthForm.valueChanges.subscribe(
      (auth: DIMAuth) => {
        this.authFormEntries = onUpdateFormProps(this.authFormEntries, auth);
      }
    );
    this.systemsSUB$ = this.appState
      .pipe(select(getAllSystems))
      .subscribe((systems: Array<DIMSystem>) => {
        this.systems = systems;
      });
    this.userSUB$ = this.appState
      .pipe(select(getCurrentUser))
      .subscribe((user: User) => (this.user = user));
    this.subscriptions.push(this.userSUB$);
    this.subscriptions.push(this.authFormSUB$);
    this.subscriptions.push(this.selectedAuthSUB$);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  onSubmitForm(): void {
    this.isUpdating = true;
    this.selectedAuthSUB$ = this.authState
      .pipe(select(getSelectedAuth))
      .subscribe((auth: DIMAuth) => {
        const updatedAuth = _.merge(_.clone(this.authFormEntries), {
          id: auth?.id,
          lastUpdatedAt: new Date(),
          createdBy: this.user.name,
          createdById: this.user.id,
          lastUpdatedBy: this.user.name,
          lastUpdatedById: this.user.id,
        });
        this.authState.dispatch(UpdateAuth(_.clone({ auth: updatedAuth })));
        /**
         *
         */
        this.authUpdatedSUB$ = this.authState
          .pipe(select(getAuthEditedStatus))
          .subscribe((status: boolean) => {
            if (status) {
              this.isUpdating = false;
              this.router.navigate(['../../list'], { relativeTo: this.route });
              OpenSnackBar(
                this.snackBar,
                `Auth "${updatedAuth?.name}" with id <${updatedAuth?.id}> is successfully updated`,
                '',
                'success-snackbar'
              );
            }
          });
        this.errorSUB$ = this.authState
          .pipe(select(getAuthError))
          .subscribe((error: HTTPErrorMessage) => {
            if (error) {
              this.isUpdating = false;
              this.router.navigate(['../../list'], { relativeTo: this.route });
              const message = _.has(error.error, 'message')
                ? error.error.message
                : error.error.error;
              OpenSnackBar(this.snackBar, message, '', 'error-snackbar');
            }
          });
      });
    /**
     *
     */
    this.subscriptions.push(this.authUpdatedSUB$);
    this.subscriptions.push(this.selectedAuthSUB$);
    this.subscriptions.push(this.errorSUB$);
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
