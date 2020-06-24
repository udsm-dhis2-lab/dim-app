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
import { Router, ActivatedRoute } from '@angular/router';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';
import { JobState, CreateJob } from '../../../state';
import { DIMJob } from '../../../models/job.model';
import { getJobCreatedStatus, getJobError } from '../../../state/job.selector';
import { OrganisationUnitLevels } from '../../../config/orgunit-level.config';
import { PeriodSelection, Item } from '../../../models/period.model';
import { DataSelection, DataItem } from '../../../models/data.model';
import { getCurrentUser } from 'src/app/state/selectors/user.selectors';
import { User } from '@iapps/ngx-dhis2-http-client';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
})
export class CreateJobComponent implements OnInit, OnDestroy {
  // matcher = new MyErrorStateMatcher();
  user: User;
  jobFormEntries: DataEntryField = _.clone(_.create());
  isUpdating: boolean;
  organisationUnitLevels: Array<{
    name: string;
    level: string;
  }> = OrganisationUnitLevels;
  createJobForm: FormGroup = new FormGroup({
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

  orgUnitsUidsDetails: Array<string>;

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

  // Subscriptions
  subscriptions: Array<Subscription> = [];
  formSUB$: Subscription;
  integrationCreatedSUB$: Subscription;
  createdIntegrationSUB$: Subscription;
  errorSUB$: Subscription;
  userSUB$: Subscription;

  constructor(
    private appState: Store<AppState>,
    private integrationState: Store<JobState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.formSUB$ = this.createJobForm.valueChanges.subscribe((job: DIMJob) => {
      this.jobFormEntries = onUpdateFormProps(
        this.jobFormEntries,
        _.omit(job, ['pe', 'dx'])
      );
    });
    this.userSUB$ = this.appState
      .pipe(select(getCurrentUser))
      .subscribe((user: User) => (this.user = user));
    this.subscriptions.push(this.userSUB$);
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
    const job = _.merge(_.clone(this.jobFormEntries), {
      id,
      createdBy: this.user.name,
      createdById: this.user.id,
      lastUpdatedBy: this.user.name,
      lastUpdatedById: this.user.id,
    });
    this.integrationState.dispatch(CreateJob(_.clone({ job })));
    this.integrationCreatedSUB$ = this.integrationState
      .pipe(select(getJobCreatedStatus))
      .subscribe((status: boolean) => {
        if (status) {
          this.isUpdating = false;
          this.router.navigate(['../list'], { relativeTo: this.route });
          OpenSnackBar(
            this.snackBar,
            `Job "${job?.name}" with id <${job?.id}> is successfully created`,
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

  onPeriodUpdate(periods: PeriodSelection, action: string) {
    const periodIds = _.map(periods?.items || [], (item: Item) => item);
    this.jobFormEntries = {
      ...this.jobFormEntries,
      pe: { periods: periodIds },
    };
  }

  onDataUpdate(datas: DataSelection, action: string) {
    const selectedData = _.map(datas?.items || [], (item: DataItem) => {
      return {
        id: item?.id,
        name: item?.name,
        type: item?.type,
        dimensions: [],
      };
    });
    this.jobFormEntries = {
      ...this.jobFormEntries,
      dx: { data: selectedData },
    };
  }
}
