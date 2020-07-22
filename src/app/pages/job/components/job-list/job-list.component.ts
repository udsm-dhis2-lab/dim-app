import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';

import * as _ from 'lodash';

import { JobTableCulumns } from '../../config/job-table.config';
import { Observable, Subscription } from 'rxjs';
import { DIMJob } from '../../models/job.model';
import { JobState, LoadJobs, SetSelectedJob, DeleteJob } from '../../state';
import { getAllJobs, getDeletedJobStatus, getJobLoaded, getJobLoading, getJobError } from '../../state/job.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit, OnDestroy {
  displayedColumns: Array<string> = JobTableCulumns;
  systems$: Observable<Array<DIMJob>>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  subscriptions: Array<Subscription> = [];
  systemSUB$: Subscription;
  systemDeleteSUB$: Subscription;
  errorSUB$: Subscription;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<HTTPErrorMessage>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private jobState: Store<JobState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.jobState.dispatch(LoadJobs());
    this.systems$ = this.jobState.pipe(select(getAllJobs));
    this.loaded$ = this.jobState.pipe(select(getJobLoaded));
    this.loading$ = this.jobState.pipe(select(getJobLoading));
    this.error$ = this.jobState.pipe(select(getJobError));
    this.errorSUB$ = this.error$.subscribe((error: HTTPErrorMessage) => {
      if (error) {
        const message = _.has(error.error, 'message')
          ? error.error.message
          : error.error.error;
        OpenSnackBar(
          this.snackBar,
          message ? message : error.message,
          '',
          'error-snackbar'
        );
        this.router.navigate(['./'], { relativeTo: this.route });
      }
    });
    this.systemSUB$ = this.jobState
      .pipe(select(getAllJobs))
      .subscribe((job: Array<DIMJob>) => {
        this.dataSource = new MatTableDataSource<DIMJob>(job);
        if (this.dataSource) {
          this.dataSource.paginator = this.paginator;
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        }
      });
    this.subscriptions.push(this.systemSUB$);
  }

  ngOnDestroy() {
    _.map(this.subscriptions, (subscription: Subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  openDataEntryForm(): void {
    this.router.navigate(['../create'], { relativeTo: this.route });
  }

  applyFilter(filterValue: string) {
    this.systemSUB$ = this.jobState
      .pipe(select(getAllJobs))
      .subscribe((jobs: Array<DIMJob>) => {
        if (jobs) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
      });
    this.subscriptions.push(this.systemSUB$);
  }

  onEdit(job: DIMJob) {
    this.jobState.dispatch(SetSelectedJob({ job }));
    this.router.navigate(['../edit/' + job?.id], {
      relativeTo: this.route,
    });
  }

  onDelete(job: DIMJob) {
    if (
      confirm(
        `Are you sure you want to delete Job <${job?.jobName}> with id <${job?.id}> `
      )
    ) {
      this.jobState.dispatch(DeleteJob({ job }));
      this.systemDeleteSUB$ = this.jobState
        .pipe(select(getDeletedJobStatus))
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['./'], { relativeTo: this.route });
            OpenSnackBar(
              this.snackBar,
              `Job "${job?.jobName}" with id <${job?.id}> is successfully deleted`,
              '',
              'success-snackbar'
            );
          }
        });
      this.subscriptions.push(this.systemDeleteSUB$);
    }
  }

  onViewMore() {
    //
  }
}
