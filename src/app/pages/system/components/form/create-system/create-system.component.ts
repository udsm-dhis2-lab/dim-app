import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { uuid } from '@icodebible/utils/uuid';
import * as _ from 'lodash';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { AppState } from 'src/app/state/states/app.state';
import { CreateSystem } from 'src/app/pages/system/state';
import { DIMSystem } from 'src/app/pages/home/models/integration.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { getSystemCreatedStatus } from 'src/app/pages/system/state/system.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemState } from '../../../state/system.state';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-create-system',
  templateUrl: './create-system.component.html',
  styleUrls: ['./create-system.component.scss'],
})
export class CreateSystemComponent implements OnInit, OnDestroy {
  // matcher = new MyErrorStateMatcher();
  integrationFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  subscriptions: Array<Subscription> = [];
  createSystemForm: FormGroup = new FormGroup({
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
    importURL: new FormControl(''),
    isUsingHIM: new FormControl(''),
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
    private systemState: Store<SystemState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.formSUB$ = this.createSystemForm.valueChanges.subscribe(
      (system: DIMSystem) => {
        this.integrationFormEntries = onUpdateFormProps(
          this.integrationFormEntries,
          system
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
    this.isUpdating = true;
    const id = uuid('', 11);
    const system = _.merge(_.clone(this.integrationFormEntries), {
      id,
    });
    this.systemState.dispatch(CreateSystem(_.clone({ system })));
    this.integrationCreatedSUB$ = this.systemState
      .pipe(select(getSystemCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.isUpdating = false;
          this.router.navigate(['../list'], { relativeTo: this.route });
          OpenSnackBar(
            this.snackBar,
            `System "${system?.name}" with id <${system?.id}> is successfully created`,
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
