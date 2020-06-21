import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { uuid } from '@icodebible/utils/uuid';
import * as _ from 'lodash';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { Subscription, Observable } from 'rxjs';
import { AppState } from 'src/app/state/states/app.state';
import { onUpdateFormProps } from 'src/app/shared/utils/form-values-updater.utils';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { BatchState, CreateBatch } from '../../../state';
import { Router, ActivatedRoute } from '@angular/router';
import { DIMBatch } from '../../../models/batch.model';
import { JobService } from 'src/app/pages/job/services/job.service';
import { DIMJob } from 'src/app/pages/job/models/job.model';
import { User } from '@iapps/ngx-dhis2-http-client';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { arrayToObject } from 'src/app/shared/helpers/array-to-object.helper';
import { getBatchCreatedStatus } from '../../../state/batch.selector';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.scss'],
})
export class CreateBatchComponent implements OnInit, OnDestroy {
  // matcher = new MyErrorStateMatcher();
  batchFormEntries: DataEntryField = _.clone(_.create());
  jobs$: Observable<Array<DIMJob | any>>;
  procJobs: Array<DIMBatch> = [];
  user: User;
  isUpdating: boolean;
  subscriptions: Array<Subscription> = [];
  createBatchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    createdAt: new FormControl(new Date()),
    lastUpdatedAt: new FormControl(new Date()),
  });

  // Subscriptions
  formSUB$: Subscription;
  batchCreatedSUB$: Subscription;
  createdBatchSUB$: Subscription;
  errorSUB$: Subscription;
  userSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private batchState: Store<BatchState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.jobs$ = this.jobService.getJobs();
    this.formSUB$ = this.createBatchForm.valueChanges.subscribe(
      (batch: DIMBatch) => {
        this.batchFormEntries = onUpdateFormProps(this.batchFormEntries, batch);
      }
    );
    this.userSUB$ = this.appState
      .pipe(select(getCurrentUser))
      .subscribe((user: User) => (this.user = user));
    this.subscriptions.push(this.userSUB$);
    this.subscriptions.push(this.formSUB$);
  }

  getSelectedJob(job: Array<DIMJob>) {
    if (job) {
      this.procJobs = _.union(_.clone(this.procJobs), job);
    }
  }

  getJobCustomUID(): string {
    return `job_${uuid('', 11)}`;
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
    const batch = _.merge(
      _.clone(this.batchFormEntries),
      {
        id,
        createdBy: this.user.name,
        createdById: this.user.id,
        lastUpdatedBy: this.user.name,
        lastUpdatedById: this.user.id,
      },
      arrayToObject(_.clone(this.procJobs), 'id', 'job', '_')
    );
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
    this.subscriptions.push(this.batchCreatedSUB$);
  }

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
