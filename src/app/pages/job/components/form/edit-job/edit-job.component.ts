import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as _ from 'lodash';

import { DataEntryField } from 'src/app/shared/models/form.model';
import { JobState, UpdateJob } from '../../../state';
import { DIMJob } from '../../../models/job.model';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import {
  getSelectedJob,
  getJobEditedStatus,
  getJobError,
} from '../../../state/job.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit, OnDestroy {
  jobFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  updateJobForm: FormGroup = new FormGroup({
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
  jobFormSUB$: Subscription;
  jobUpdatedSUB$: Subscription;
  updatedJobSUB$: Subscription;
  selectedJobSUB$: Subscription;
  errorSUB$: Subscription;

  constructor(
    private jobState: Store<JobState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.jobFormSUB$ = this.updateJobForm.valueChanges.subscribe(
      (job: DIMJob) => {
        this.jobFormEntries = onUpdateFormProps(this.jobFormEntries, job);
      }
    );
    this.selectedJobSUB$ = this.jobState
      .pipe(select(getSelectedJob))
      .subscribe((job: DIMJob) => {
        this.updateJobForm.patchValue(job);
      });
    this.subscriptions.push(this.jobFormSUB$);
    this.subscriptions.push(this.selectedJobSUB$);
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
    this.selectedJobSUB$ = this.jobState
      .pipe(select(getSelectedJob))
      .subscribe((job: DIMJob) => {
        const updatedJob = _.merge(_.clone(this.jobFormEntries), {
          id: job?.id,
        });
        this.jobState.dispatch(UpdateJob(_.clone({ job: updatedJob })));
        /**
         *
         */
        this.jobUpdatedSUB$ = this.jobState
          .pipe(select(getJobEditedStatus))
          .subscribe((status: boolean) => {
            if (status) {
              this.isUpdating = false;
              this.router.navigate(['../../list'], { relativeTo: this.route });
              OpenSnackBar(
                this.snackBar,
                `Job "${updatedJob?.name}" with id <${updatedJob?.id}> is successfully updated`,
                '',
                'success-snackbar'
              );
            }
          });
        this.errorSUB$ = this.jobState
          .pipe(select(getJobError))
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
    this.subscriptions.push(this.jobUpdatedSUB$);
    this.subscriptions.push(this.selectedJobSUB$);
    this.subscriptions.push(this.errorSUB$);
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
