import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { uuid } from '@icodebible/utils/uuid';
import * as _ from 'lodash';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/state/states/app.state';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { BatchState, CreateBatch } from '../../../state';
import { Router, ActivatedRoute } from '@angular/router';
import { DIMBatch } from '../../../models/batch.model';
import {
  getBatchCreatedStatus,
  getBatchError,
} from '../../../state/batch.selector';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss'],
})
export class CreateBatchComponent implements OnInit, OnDestroy {
  // matcher = new MyErrorStateMatcher();
  batchFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  subscriptions: Array<Subscription> = [];
  createBatchForm: FormGroup = new FormGroup({
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
  batchCreatedSUB$: Subscription;
  createdBatchSUB$: Subscription;
  errorSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private batchState: Store<BatchState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.formSUB$ = this.createBatchForm.valueChanges.subscribe(
      (batch: DIMBatch) => {
        this.batchFormEntries = onUpdateFormProps(this.batchFormEntries, batch);
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
    const batch = _.merge(_.clone(this.batchFormEntries), {
      id,
    });
    this.batchState.dispatch(CreateBatch(_.clone({ batch })));
    this.batchCreatedSUB$ = this.batchState
      .pipe(select(getBatchCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.isUpdating = false;
          this.router.navigate(['../list'], { relativeTo: this.route });
          OpenSnackBar(
            this.snackBar,
            `Batch "${batch?.name}" with id <${batch?.id}> is successfully created`,
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
    this.subscriptions.push(this.batchCreatedSUB$);
    this.subscriptions.push(this.errorSUB$);
  }

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
