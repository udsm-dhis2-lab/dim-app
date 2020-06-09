import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import * as _ from 'lodash';

import { FormControl, FormGroup } from '@angular/forms';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { SystemIntegration } from '../../../models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/states/app.state';
import { Store } from '@ngrx/store';
import {
  SystemIntegrationState,
  CreateSystemIntegration,
} from '../../../state';

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
    importURL: new FormControl(false),
    isUsingHIM: new FormControl(false),
    dataFromURL: new FormControl(''),
    isUsingLiveDhis2: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl(''),
  });

  // Subscriptions
  formSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private systemIntegrationState: Store<SystemIntegrationState>
  ) {}

  ngOnInit(): void {
    this.formSUB$ = this.createIntegrationForm.valueChanges.subscribe(
      (systemIntegration: SystemIntegration) => {
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
    const systemIntegration: SystemIntegration = <SystemIntegration>(
      this.integrationFormEntries
    );
    this.systemIntegrationState.dispatch(
      CreateSystemIntegration({ systemIntegration })
    );
  }
}
