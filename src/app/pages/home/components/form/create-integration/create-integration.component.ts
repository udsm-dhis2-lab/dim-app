import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import * as _ from 'lodash';
import { uuid } from '@icodebible/utils/uuid';

import { FormControl, FormGroup } from '@angular/forms';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { DIMSystem } from '../../../models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/states/app.state';
import { Store, select } from '@ngrx/store';
import {
  SystemIntegrationState,
  CreateSystem,
} from '../../../../system/state';
import {
  getSystemCreatedStatus,
  getCreatedSystem,
} from '../../../../system/state/integration.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-integration',
  templateUrl: './create-integration.component.html',
  styleUrls: ['./create-integration.component.scss'],
})
export class CreateIntegrationComponent implements OnInit, OnDestroy {
  systems: Array<{ [key: string]: any }> = [
    {
      name: 'National Health Portal',
      id: 'portal',
    },
    {
      name: 'DHIS2 HMIS',
      id: 'hmis',
    },
    {
      name: 'NSMIS',
      id: 'nsmis',
    },
    {
      name: 'ARDS',
      id: 'ards',
    },
  ];
  integrationFormEntries: DataEntryField = _.clone(_.create());
  subscriptions: Array<Subscription> = [];
  createIntegrationForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    defaultCOC: new FormControl(''),
    isAllowed: new FormControl(false),
    importURL: new FormControl(''),
    isUsingHIM: new FormControl(false),
    dataFromURL: new FormControl(''),
    isUsingLiveDhis2: new FormControl(false),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  // Subscriptions
  formSUB$: Subscription;
  integrationCreatedSUB$: Subscription;
  createdIntegrationSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private systemIntegrationState: Store<SystemIntegrationState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formSUB$ = this.createIntegrationForm.valueChanges.subscribe(
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
    this.systemIntegrationState.dispatch(
      CreateSystem(_.clone({ systemIntegration }))
    );
    this.integrationCreatedSUB$ = this.systemIntegrationState
      .pipe(select(getSystemCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.createIntegrationForm.reset();
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
