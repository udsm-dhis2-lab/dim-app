import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { Subscription } from 'rxjs';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { BatchState, UpdateBatch } from '../../../state';
import { Router, ActivatedRoute } from '@angular/router';
import { DIMBatch } from '../../../models/batch.model';
import {
  getSelectedBatch,
  getBatchEditedStatus,
  getBatchError,
} from '../../../state/batch.selector';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.scss'],
})
export class EditBatchComponent implements OnInit, OnDestroy {
  batchFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  updateBatchForm: FormGroup = new FormGroup({
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
  batchFormSUB$: Subscription;
  batchUpdatedSUB$: Subscription;
  updatedBatchSUB$: Subscription;
  selectedBatchSUB$: Subscription;
  errorSUB$: Subscription;

  constructor(
    private batchState: Store<BatchState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.batchFormSUB$ = this.updateBatchForm.valueChanges.subscribe(
      (batch: DIMBatch) => {
        this.batchFormEntries = onUpdateFormProps(this.batchFormEntries, batch);
      }
    );
    this.selectedBatchSUB$ = this.batchState
      .pipe(select(getSelectedBatch))
      .subscribe((batch: DIMBatch) => {
        this.updateBatchForm.patchValue(batch);
      });
    this.subscriptions.push(this.batchFormSUB$);
    this.subscriptions.push(this.selectedBatchSUB$);
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
    this.selectedBatchSUB$ = this.batchState
      .pipe(select(getSelectedBatch))
      .subscribe((batch: DIMBatch) => {
        const updatedBatch = _.merge(_.clone(this.batchFormEntries), {
          id: batch?.id,
        });
        this.batchState.dispatch(UpdateBatch(_.clone({ batch: updatedBatch })));
        /**
         *
         */
        this.batchUpdatedSUB$ = this.batchState
          .pipe(select(getBatchEditedStatus))
          .subscribe((status: boolean) => {
            if (status) {
              this.isUpdating = false;
              this.router.navigate(['../../list'], { relativeTo: this.route });
              OpenSnackBar(
                this.snackBar,
                `Batch "${updatedBatch?.name}" with id <${updatedBatch?.id}> is successfully updated`,
                '',
                'success-snackbar'
              );
            }
          });
        this.errorSUB$ = this.batchState
          .pipe(select(getBatchError))
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
    this.subscriptions.push(this.batchUpdatedSUB$);
    this.subscriptions.push(this.selectedBatchSUB$);
    this.subscriptions.push(this.errorSUB$);
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
