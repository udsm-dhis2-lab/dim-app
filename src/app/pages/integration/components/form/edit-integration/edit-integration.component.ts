import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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

@Component({
  selector: 'app-edit-integration',
  templateUrl: './edit-integration.component.html',
  styleUrls: ['./edit-integration.component.scss'],
})
export class EditIntegrationComponent implements OnInit, OnDestroy {
  systemFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  updateIntegrationForm: FormGroup = new FormGroup({
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

  subscriptions: Array<Subscription> = [];
  systemFormSUB$: Subscription;
  systemUpdatedSUB$: Subscription;
  updatedSystemSUB$: Subscription;
  selectedSystemSUB$: Subscription;
  errorSUB$: Subscription;

  constructor(
    private integrationState: Store<IntegrationState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.systemFormSUB$ = this.updateIntegrationForm.valueChanges.subscribe(
      (integration: DIMIntegration) => {
        this.systemFormEntries = onUpdateFormProps(
          this.systemFormEntries,
          integration
        );
      }
    );
    this.selectedSystemSUB$ = this.integrationState
      .pipe(select(getSelectedIntegration))
      .subscribe((integration: DIMIntegration) => {
        this.updateIntegrationForm.patchValue(integration);
      });
    this.subscriptions.push(this.systemFormSUB$);
    this.subscriptions.push(this.selectedSystemSUB$);
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
    this.selectedSystemSUB$ = this.integrationState
      .pipe(select(getSelectedIntegration))
      .subscribe((integration: DIMIntegration) => {
        const updatedIntegration = _.merge(_.clone(this.systemFormEntries), {
          id: integration?.id,
        });
        this.integrationState.dispatch(
          UpdateIntegration(_.clone({ system: updatedIntegration }))
        );
        /**
         *
         */
        this.systemUpdatedSUB$ = this.integrationState
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
    this.subscriptions.push(this.systemUpdatedSUB$);
    this.subscriptions.push(this.selectedSystemSUB$);
    this.subscriptions.push(this.errorSUB$);
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
