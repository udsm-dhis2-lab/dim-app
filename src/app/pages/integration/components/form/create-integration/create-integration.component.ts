import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { AppState } from 'src/app/state/states/app.state';
import { IntegrationState, CreateIntegration } from '../../../state';
import { DIMIntegration } from '../../../models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import {
  getIntegrationCreatedStatus,
  getIntegrationError,
} from '../../../state/integration.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { DIMSystem } from 'src/app/pages/system/models/system.model';
import { SystemService } from 'src/app/pages/system/services/system.service';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { User } from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-create-integration',
  templateUrl: './create-integration.component.html',
  styleUrls: ['./create-integration.component.scss'],
})
export class CreateIntegrationComponent implements OnInit, OnDestroy {
  // matcher = new MyErrorStateMatcher();
  integrationFormEntries: DataEntryField = _.clone(_.create());
  systems: Array<DIMSystem | any>;
  user: User;
  systems$: Observable<Array<DIMSystem | any>>;
  isUpdating: boolean;
  subscriptions: Array<Subscription> = [];
  createIntegrationForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    isAllowed: new FormControl(false),
    isUsingHIM: new FormControl(false),
    isUsingLiveDhis2: new FormControl(false),
    defaultCOC: new FormControl(''),
    importURL: new FormControl(''),
    dataFromURL: new FormControl(''),
    systemInfo: new FormGroup({
      from: new FormControl(),
      to: new FormControl(),
    }),
    createdAt: new FormControl(new Date()),
    lastUpdatedAt: new FormControl(new Date()),
  });

  // Subscriptions
  formSUB$: Subscription;
  integrationCreatedSUB$: Subscription;
  createdIntegrationSUB$: Subscription;
  systemsSUB$: Subscription;
  errorSUB$: Subscription;
  userSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private integrationState: Store<IntegrationState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.systems$ = this.systemService.getSystems();
    this.formSUB$ = this.createIntegrationForm.valueChanges.subscribe(
      (integration: DIMIntegration) => {
        this.integrationFormEntries = onUpdateFormProps(
          this.integrationFormEntries,
          integration
        );
      }
    );
    this.systemsSUB$ = this.systemService
      .getSystems()
      .subscribe((systems: Array<DIMSystem>) => {
        this.systems = systems;
      });
    this.userSUB$ = this.appState
      .pipe(select(getCurrentUser))
      .subscribe((user: User) => (this.user = user));
    this.subscriptions.push(this.userSUB$);
    this.subscriptions.push(this.formSUB$);
    this.subscriptions.push(this.systemsSUB$);
  }

  getEditorHeight(e: any) {
    //
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
    const integration = _.merge(_.clone(this.integrationFormEntries), {
      id,
      createdBy: this.user.name,
      createdById: this.user.id,
      lastUpdatedBy: this.user.name,
      lastUpdatedById: this.user.id,
    });
    this.integrationState.dispatch(CreateIntegration(_.clone({ integration })));
    this.integrationCreatedSUB$ = this.integrationState
      .pipe(select(getIntegrationCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.isUpdating = false;
          this.router.navigate(['../list'], { relativeTo: this.route });
          OpenSnackBar(
            this.snackBar,
            `Integration "${integration?.name}" with id <${integration?.id}> is successfully created`,
            '',
            'success-snackbar'
          );
        }
      });
    this.subscriptions.push(this.integrationCreatedSUB$);
  }

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
