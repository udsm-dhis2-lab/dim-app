import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { uuid } from '@icodebible/utils/uuid';
import * as _ from 'lodash';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { OrgUnitLevel } from 'src/app/pages/job/models/orgunit-level.model';
import { OrgUnitLevelConfig } from 'src/app/pages/job/config/orgunit-level.config';
import { AppState } from 'src/app/state/states/app.state';
import { SystemIntegrationState, CreateDIMSystem } from 'src/app/pages/system/state';
import { DIMSystem } from 'src/app/pages/home/models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { getSystemIntegrationCreatedStatus } from 'src/app/pages/system/state/integration.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-create-system',
  templateUrl: './create-system.component.html',
  styleUrls: ['./create-system.component.scss']
})
export class CreateSystemComponent implements OnInit, OnDestroy {
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
  // matcher = new MyErrorStateMatcher();
  integrationFormEntries: DataEntryField = _.clone(_.create());
  subscriptions: Array<Subscription> = [];
  organisationUnitLevels: Array<OrgUnitLevel> = OrgUnitLevelConfig;
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
    private systemIntegrationState: Store<SystemIntegrationState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
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
    this.systemIntegrationState.dispatch(
      CreateDIMSystem(_.clone({ systemIntegration }))
    );
    this.integrationCreatedSUB$ = this.systemIntegrationState
      .pipe(select(getSystemIntegrationCreatedStatus))
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

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route});
  }
}
