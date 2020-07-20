import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/states/app.state';
import {
  SystemState,
  CreateSystem,
} from 'src/app/pages/system/state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { getSystemCreatedStatus } from 'src/app/pages/system/state/system.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { DataExchangeStatus } from '../../../models/status.model';
import { DIMSystem } from 'src/app/pages/system/models/system.model';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
})
export class CreateReportComponent implements OnInit, OnDestroy {
  statuses: Array<DataExchangeStatus> = [
    { name: 'All', status: 'all' },
    { name: 'Success', status: 'status' },
    { name: 'Failure', status: 'failure' },
  ];
  integrationFormEntries: DataEntryField = _.clone(_.create());
  subscriptions: Array<Subscription> = [];
  createJobForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    isExecuted: new FormControl(false),
    dataSet: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
    ou: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
    description: new FormControl(''),
    defaultCOC: new FormControl(''),
    isAllowed: new FormControl(false),
    importURL: new FormControl(false),
    isUsingHIM: new FormControl(false),
    dataFromURL: new FormControl(''),
    isUsingLiveDhis2: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  // Subscriptions
  formSUB$: Subscription;
  integrationCreatedSUB$: Subscription;
  createdIntegrationSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private systemState: Store<SystemState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formSUB$ = this.createJobForm.valueChanges.subscribe(
      (systemIntegration: DIMSystem) => {
        this.integrationFormEntries = onUpdateFormProps(
          this.integrationFormEntries,
          systemIntegration
        );
      }
    );
    this.subscriptions.push(this.formSUB$);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  onSubmitForm(): void {
    const id = uuid('', 11);
    const systemIntegration = _.merge(_.clone(this.integrationFormEntries), {
      id,
    });
    console.log('SYSTEM INTEGRATION::: ' + JSON.stringify(systemIntegration, null, 4));
    this.systemState.dispatch(
      CreateSystem(_.clone({ systemIntegration }))
    );
    this.integrationCreatedSUB$ = this.systemState
      .pipe(select(getSystemCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.createJobForm.reset();
          OpenSnackBar(
            this.snackBar,
            `System Integration "${systemIntegration?.name}" with id <${systemIntegration?.id}> is successfully created`,
            '',
            'success-snackbar'
          );
        }
      });
    this.subscriptions.push(this.integrationCreatedSUB$);
  }
}
