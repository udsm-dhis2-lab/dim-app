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
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import {
  getSystemCreatedStatus,
  getSystemError,
} from 'src/app/pages/system/state/system.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemState } from '../../../state/system.state';
import { DIMSystem } from '../../../models/system.model';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';

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
  systemFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  subscriptions: Array<Subscription> = [];
  createSystemForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    createdAt: new FormControl(new Date()),
    lastUpdatedAt: new FormControl(new Date())
  });

  // Subscriptions
  formSUB$: Subscription;
  systemCreatedSUB$: Subscription;
  createdSystemSUB$: Subscription;
  errorSUB$: Subscription;

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
        this.systemFormEntries = onUpdateFormProps(
          this.systemFormEntries,
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
    const system = _.merge(_.clone(this.systemFormEntries), {
      id,
    });
    this.systemState.dispatch(CreateSystem(_.clone({ system })));
    this.systemCreatedSUB$ = this.systemState
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

    this.errorSUB$ = this.systemState
      .pipe(select(getSystemError))
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
    this.subscriptions.push(this.errorSUB$);
    this.subscriptions.push(this.systemCreatedSUB$);
  }

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
