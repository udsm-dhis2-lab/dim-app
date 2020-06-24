import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { AppState } from 'src/app/state/states/app.state';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { DIMSystem } from 'src/app/pages/system/models/system.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { AuthState, CreateAuth } from '../../../state';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/pages/system/services/system.service';
import { DIMAuth } from '../../../models/auth.model';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { getAuthCreatedStatus } from '../../../state/auth.selector';
import { LoadSystems } from 'src/app/pages/system/state';
import { getAllSystems } from 'src/app/pages/system/state/system.selector';

@Component({
  selector: 'app-create-auth',
  templateUrl: './create-auth.component.html',
  styleUrls: ['./create-auth.component.scss'],
})
export class CreateAuthComponent implements OnInit, OnDestroy {
  // matcher = new MyErrorStateMatcher();
  authFormEntries: DataEntryField = _.clone(_.create());
  systems: Array<DIMSystem | any>;
  systems$: Observable<Array<DIMSystem | any>>;
  user: User;
  isUpdating: boolean;
  subscriptions: Array<Subscription> = [];
  createAuthForm: FormGroup = new FormGroup({
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

  // Subscriptions
  formSUB$: Subscription;
  authCreatedSUB$: Subscription;
  createdAuthSUB$: Subscription;
  systemSUB$: Subscription;
  errorSUB$: Subscription;
  userSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private authState: Store<AuthState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.appState.dispatch(LoadSystems());
    this.systems$ = this.appState.pipe(select(getAllSystems));
    this.formSUB$ = this.createAuthForm.valueChanges.subscribe(
      (auth: DIMAuth) => {
        this.authFormEntries = onUpdateFormProps(this.authFormEntries, auth);
      }
    );
    this.systemSUB$ = this.appState
      .pipe(select(getAllSystems))
      .subscribe((systems: Array<DIMSystem>) => {
        this.systems = systems;
      });
    this.userSUB$ = this.appState
      .pipe(select(getCurrentUser))
      .subscribe((user: User) => (this.user = user));
    this.subscriptions.push(this.userSUB$);
    this.subscriptions.push(this.formSUB$);
    this.subscriptions.push(this.systemSUB$);
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
    const id = uuid('', 11);
    const auth = _.merge(_.clone(this.authFormEntries), {
      id,
      createdBy: this.user.name,
      createdById: this.user.id,
      lastUpdatedBy: this.user.name,
      lastUpdatedById: this.user.id,
    });
    this.authState.dispatch(CreateAuth(_.clone({ auth: auth })));
    this.authCreatedSUB$ = this.authState
      .pipe(select(getAuthCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.isUpdating = false;
          this.router.navigate(['../list'], { relativeTo: this.route });
          OpenSnackBar(
            this.snackBar,
            `Auth "${auth?.name}" with id <${auth?.id}> is successfully created`,
            '',
            'success-snackbar'
          );
        }
      });
    this.subscriptions.push(this.authCreatedSUB$);
  }

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
