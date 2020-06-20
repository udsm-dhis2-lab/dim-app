import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { IntegrationState, UpdateIntegration } from '../../../state';
import { DIMIntegration } from '../../../models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import {
  getSelectedIntegration,
  getIntegrationEditedStatus,
  getIntegrationError,
} from '../../../state/integration.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { DIMSystem } from 'src/app/pages/system/models/system.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { SystemService } from 'src/app/pages/system/services/system.service';
import { AppState } from 'src/app/state/states/app.state';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { DIMBatch } from 'src/app/pages/batch/models/batch.model';
import { BatchService } from 'src/app/pages/batch/services/batch.service';
import { uuid } from '@icodebible/utils/uuid';
import { arrayToObject } from 'src/app/shared/helpers/array-to-object.helper';

@Component({
  selector: 'app-edit-integration',
  templateUrl: './edit-integration.component.html',
  styleUrls: ['./edit-integration.component.scss'],
})
export class EditIntegrationComponent implements OnInit, OnDestroy {
  integrationFormEntries: DataEntryField = _.clone(_.create());
  systems: Array<DIMSystem | any>;
  systems$: Observable<Array<DIMSystem | any>>;
  batches$: Observable<Array<DIMBatch | any>>;
  selectedBatches: Array<DIMBatch | any>;
  procBatch: Array<DIMBatch> = [];
  user: User;
  isUpdating: boolean;
  updateIntegrationForm: FormGroup = new FormGroup({
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

  subscriptions: Array<Subscription> = [];
  integrationFormSUB$: Subscription;
  integrationUpdatedSUB$: Subscription;
  updatedIntegrationSUB$: Subscription;
  selectedIntegrationSUB$: Subscription;
  errorSUB$: Subscription;
  systemsSUB$: Subscription;
  userSUB$: Subscription;
  batchesSUB$: Subscription;

  constructor(
    private integrationState: Store<IntegrationState>,
    private appState: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService,
    private batchService: BatchService
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.systems$ = this.systemService.getSystems();
    this.batchesSUB$ = this.batchService
      .getBatches()
      .subscribe((batches: Array<DIMBatch | any>) => {
        this.batches$ = of(
          _.filter(batches, (batch: DIMBatch) => {
            return !_.includes(
              _.map(
                _.clone(this.selectedBatches),
                (selectedBatch: DIMBatch) => selectedBatch?.id
              ),
              batch?.id
            );
          })
        );
      });
    this.selectedIntegrationSUB$ = this.integrationState
      .pipe(select(getSelectedIntegration))
      .subscribe((integration: DIMIntegration) => {
        this.selectedBatches = this.getSelectedBatches(integration);
        this.updateIntegrationForm.patchValue(integration);
      });
    this.integrationFormSUB$ = this.updateIntegrationForm.valueChanges.subscribe(
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
    this.subscriptions.push(this.integrationFormSUB$);
    this.subscriptions.push(this.selectedIntegrationSUB$);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  getSelectedBatches(integration: DIMIntegration): Array<DIMBatch> {
    const selectedBatches: Array<DIMBatch> = [];
    if (integration) {
      for (const key of _.keys(integration)) {
        if (_.head(_.split(key, '_')) === 'batch') {
          selectedBatches.push(integration[key]);
        }
      }
      return selectedBatches;
    }
  }

  getSelectedBatch(batch: Array<DIMBatch>) {
    if (batch) {
      this.procBatch = _.union(_.clone(this.procBatch), batch);
    }
  }

  getBatchCustomUID(): string {
    return `batch_${uuid('', 11)}`;
  }

  onSubmitForm(): void {
    this.isUpdating = true;
    this.selectedIntegrationSUB$ = this.integrationState
      .pipe(select(getSelectedIntegration))
      .subscribe((integration: DIMIntegration) => {
        const updatedIntegration = _.merge(
          _.clone(this.integrationFormEntries),
          {
            id: integration?.id,
            lastUpdatedAt: new Date(),
            createdBy: this.user.name,
            createdById: this.user.id,
            lastUpdatedBy: this.user.name,
            lastUpdatedById: this.user.id,
          },
          arrayToObject(_.clone(this.procBatch), 'id', 'batch', '_')
        );
        this.integrationState.dispatch(
          UpdateIntegration(_.clone({ integration: updatedIntegration }))
        );
        /**
         *
         */
        this.integrationUpdatedSUB$ = this.integrationState
          .pipe(select(getIntegrationEditedStatus))
          .subscribe((status: boolean) => {
            if (status) {
              this.isUpdating = false;
              this.router.navigate(['../../list'], { relativeTo: this.route });
              OpenSnackBar(
                this.snackBar,
                `Integration "${updatedIntegration?.name}" with id <${updatedIntegration?.id}> is successfully updated`,
                '',
                'success-snackbar'
              );
            }
          });
        this.errorSUB$ = this.integrationState
          .pipe(select(getIntegrationError))
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
    this.subscriptions.push(this.integrationUpdatedSUB$);
    this.subscriptions.push(this.selectedIntegrationSUB$);
    this.subscriptions.push(this.errorSUB$);
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
