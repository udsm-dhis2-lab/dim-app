import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { Subscription, Observable, of } from 'rxjs';
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
import { DIMJob } from 'src/app/pages/job/models/job.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { AppState } from 'src/app/state/states/app.state';
import { JobService } from 'src/app/pages/job/services/job.service';
import { arrayToObject } from 'src/app/shared/helpers/array-to-object.helper';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { uuid } from '@icodebible/utils/uuid';
@Component({
  selector: 'app-edit-batch',
  templateUrl: './edit-batch.component.html',
  styleUrls: ['./edit-batch.component.scss'],
})
export class EditBatchComponent implements OnInit, OnDestroy {
  batchFormEntries: DataEntryField = _.clone(_.create());
  jobs$: Observable<Array<DIMJob | any>>;
  selectedJobs: Array<DIMJob | any>;
  procJobs: Array<DIMJob> = [];
  user: User;
  isUpdating: boolean;
  updateBatchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    createdAt: new FormControl(),
    lastUpdatedAt: new FormControl(),
  });

  subscriptions: Array<Subscription> = [];
  batchFormSUB$: Subscription;
  batchUpdatedSUB$: Subscription;
  updatedBatchSUB$: Subscription;
  selectedBatchSUB$: Subscription;
  errorSUB$: Subscription;
  userSUB$: Subscription;
  batchesSUB$: Subscription;

  constructor(
    private batchState: Store<BatchState>,
    private appState: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.batchesSUB$ = this.jobService
      .getJobs()
      .subscribe((batches: Array<DIMBatch | any>) => {
        this.jobs$ = of(
          _.filter(batches, (batch: DIMBatch) => {
            return !_.includes(
              _.map(
                _.clone(this.selectedJobs),
                (selectedBatch: DIMBatch) => selectedBatch?.id
              ),
              batch?.id
            );
          })
        );
      });
    this.selectedBatchSUB$ = this.batchState
      .pipe(select(getSelectedBatch))
      .subscribe((batch: DIMBatch) => {
        this.selectedJobs = this.getSelectedBatches(batch);
        this.updateBatchForm.patchValue(batch);
      });
    this.batchFormSUB$ = this.updateBatchForm.valueChanges.subscribe(
      (batch: DIMBatch) => {
        this.batchFormEntries = {
          ...onUpdateFormProps(this.batchFormEntries, batch),
          ...arrayToObject(
            _.union(_.clone(this.procJobs), this.selectedJobs),
            'id',
            'job',
            '_'
          ),
        };
      }
    );
    this.userSUB$ = this.appState
      .pipe(select(getCurrentUser))
      .subscribe((user: User) => (this.user = user));
    this.subscriptions.push(this.userSUB$);
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

  getSelectedBatches(batch: DIMBatch): Array<DIMBatch> {
    const selectedJobs: Array<DIMJob> = [];
    if (batch) {
      for (const key of _.keys(batch)) {
        if (_.head(_.split(key, '_')) === 'job') {
          selectedJobs.push(batch[key]);
        }
      }
      return selectedJobs;
    }
  }

  getSelectedJobs(Job: Array<DIMJob>) {
    if (Job) {
      this.procJobs = _.union(_.clone(this.procJobs), Job);
      this.batchFormEntries = {
        ..._.clone(this.batchFormEntries),
        ...this.updateBatchForm.value,
      };
    }
  }

  getBatchCustomUID(): string {
    return `job_${uuid('', 11)}`;
  }

  onSubmitForm(): void {
    this.isUpdating = true;
    this.selectedBatchSUB$ = this.batchState
      .pipe(select(getSelectedBatch))
      .subscribe((batch: DIMBatch) => {
        const updatedBatch = _.merge(
          _.clone(this.batchFormEntries),
          {
            id: batch?.id,
            lastUpdatedAt: new Date(),
            createdBy: this.user.name,
            createdById: this.user.id,
            lastUpdatedBy: this.user.name,
            lastUpdatedById: this.user.id,
          },
          arrayToObject(_.clone(this.procJobs), 'id', 'job', '_')
        );
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
