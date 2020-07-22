import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import * as _ from 'lodash';

import { BatchTableCulumns } from '../../config/batch-table.config';
import { Observable, Subscription } from 'rxjs';
import { DIMBatch } from '../../models/batch.model';
import {
  BatchState,
  LoadBatches,
  SetSelectedBatch,
  DeleteBatch,
} from '../../state';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  getAllBatches,
  getDeletedBatchStatus,
  getBatchLoaded,
  getBatchLoading,
  getBatchError,
} from '../../state/batch.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { HTTPErrorMessage } from 'src/app/shared/models/http-error.model';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss'],
})
export class BatchListComponent implements OnInit, OnDestroy {
  displayedColumns: Array<string> = BatchTableCulumns;
  batches$: Observable<Array<DIMBatch>>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  subscriptions: Array<Subscription> = [];
  batchSUB$: Subscription;
  batchDeleteSUB$: Subscription;
  errorSUB$: Subscription;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
  error$: Observable<HTTPErrorMessage>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private batchState: Store<BatchState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.batchState.dispatch(LoadBatches());
    this.batches$ = this.batchState.pipe(select(getAllBatches));
    this.loaded$ = this.batchState.pipe(select(getBatchLoaded));
    this.loading$ = this.batchState.pipe(select(getBatchLoading));
    this.error$ = this.batchState.pipe(select(getBatchError));
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
    this.batchSUB$ = this.batchState
      .pipe(select(getAllBatches))
      .subscribe((batches: Array<DIMBatch>) => {
        this.dataSource = new MatTableDataSource<DIMBatch>(batches);
        if (this.dataSource) {
          this.dataSource.paginator = this.paginator;
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        }
      });
    this.subscriptions.push(this.batchSUB$);
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
    this.batchSUB$ = this.batchState
      .pipe(select(getAllBatches))
      .subscribe((batches: Array<DIMBatch>) => {
        if (batches) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
      });
    this.subscriptions.push(this.batchSUB$);
  }

  onEdit(batch: DIMBatch) {
    this.batchState.dispatch(SetSelectedBatch({ batch }));
    this.router.navigate(['../edit/' + batch?.id], {
      relativeTo: this.route,
    });
  }

  onDelete(batch: DIMBatch) {
    if (
      confirm(
        `Are you sure you want to delete Batch <${batch?.name}> with id <${batch?.id}> `
      )
    ) {
      this.batchState.dispatch(DeleteBatch({ batch }));
      this.batchDeleteSUB$ = this.batchState
        .pipe(select(getDeletedBatchStatus))
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['./'], { relativeTo: this.route });
            OpenSnackBar(
              this.snackBar,
              `Batch "${batch?.name}" with id <${batch?.id}> is successfully deleted`,
              '',
              'success-snackbar'
            );
          }
        });
      this.subscriptions.push(this.batchDeleteSUB$);
    }
  }

  onViewMore() {
    //
  }
}
