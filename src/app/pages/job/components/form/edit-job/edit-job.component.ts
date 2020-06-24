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
import { AppState } from 'src/app/state/states/app.state';
import { User } from '@iapps/ngx-dhis2-http-client';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { PeriodSelection, Item } from '../../../models/period.model';
import { DataItem, DataSelection } from '../../../models/data.model';
import { OrganisationUnitLevels } from '../../../config/orgunit-level.config';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent implements OnInit, OnDestroy {
  jobFormEntries: DataEntryField = _.clone(_.create());
  user: User;
  isUpdating: boolean;
  organisationUnitLevels: Array<{
    name: string;
    level: string;
  }> = OrganisationUnitLevels;
  updateJobForm: FormGroup = new FormGroup({
    jobName: new FormControl(''),
    description: new FormControl(''),
    isExecuted: new FormControl(false),
    dataSet: new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    }),
    pe: new FormGroup({
      name: new FormControl({ value: 'Period', disabled: true }),
      periods: new FormControl(),
    }),
    dx: new FormGroup({
      name: new FormControl({ value: 'Data', disabled: true }),
      data: new FormControl(),
    }),
    ou: new FormGroup({
      name: new FormControl({ value: 'Organisation Unit', disabled: true }),
      orgUnits: new FormGroup({
        hasUids: new FormControl(false),
        orgUnitLevel: new FormControl('1'),
        orgUnitUids: new FormControl(),
      }),
    }),
    mapping: new FormGroup({
      ou: new FormGroup({
        hasMapping: new FormControl(false),
        mappingCriteria: new FormGroup({
          code: new FormControl(false),
          // id: new FormControl(false),
        }),
        orgUnits: new FormControl(),
      }),
      dx: new FormGroup({
        hasMapping: new FormControl(false),
        data: new FormControl(),
      }),
    }),
    createdAt: new FormControl(new Date()),
    lastUpdatedAt: new FormControl(new Date()),
  });

  // Period Component Configuration
  selectedPeriodItems: any[] = [];
  periodFilterConfig: any = {
    singleSelection: false,
    emitOnSelection: true,
    childrenPeriodSortOrder: 'ASC',
    allowDateRangeSelection: true,
    allowRelativePeriodSelection: true,
    allowFixedPeriodSelection: true,
  };

  // Data Selection Component
  selectedDataItems: any[] = [];
  selectedDataGroups: any[] = [];
  dataFilterConfig = {
    singleSelection: false,
    emitOnSelection: true,
    enabledSelections: ['in', 'de'],
    showGroupingButton: false,
  };

  subscriptions: Array<Subscription> = [];
  jobFormSUB$: Subscription;
  jobUpdatedSUB$: Subscription;
  updatedJobSUB$: Subscription;
  selectedJobSUB$: Subscription;
  errorSUB$: Subscription;
  userSUB$: Subscription;
  batchesSUB$: Subscription;

  constructor(
    private jobState: Store<JobState>,
    private appState: Store<AppState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.selectedJobSUB$ = this.jobState
      .pipe(select(getSelectedJob))
      .subscribe((job: DIMJob) => {
        this.selectedPeriodItems = job?.pe?.periods ? job?.pe?.periods : [];
        this.selectedDataItems = job?.dx?.data ? job?.dx?.data : [];
        this.updateJobForm.patchValue(job);
        this.jobFormEntries = { ...this.jobFormEntries, ...job };
      });
    this.jobFormSUB$ = this.updateJobForm.valueChanges.subscribe(
      (job: DIMJob) => {
        this.jobFormEntries = onUpdateFormProps(this.jobFormEntries, job);
      }
    );
    this.userSUB$ = this.appState
      .pipe(select(getCurrentUser))
      .subscribe((user: User) => (this.user = user));
    this.subscriptions.push(this.userSUB$);
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
          createdBy: job?.createdBy,
          createdById: job?.createdById,
          lastUpdatedAt: new Date(),
          lastUpdatedBy: this.user.name,
          lastUpdatedById: this.user.id,
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

  onPeriodUpdate(periods: PeriodSelection, action: string) {
    const selectedPeriodItems = _.map(periods?.items || [], (item: Item) => {
      return {
        id: item?.id,
        name: item?.name,
        type: item?.type,
      };
    });
    const mPe = {
      ...this.jobFormEntries.pe,
      periods: selectedPeriodItems,
    };
    const formEntries = { ...this.jobFormEntries, pe: mPe };
    this.jobFormEntries = formEntries;
  }

  onDataUpdate(datas: DataSelection, action: string) {
    const selectedDataItems = _.map(
      datas?.items || [],
      (item: DataItem) => item
    );
    const mDx = {
      ...this.jobFormEntries.dx,
      data: selectedDataItems,
    };
    const formEntries = { ...this.jobFormEntries, dx: mDx };
    this.jobFormEntries = formEntries;
  }

  onBack() {
    this.router.navigate(['../../list'], { relativeTo: this.route });
  }
}
