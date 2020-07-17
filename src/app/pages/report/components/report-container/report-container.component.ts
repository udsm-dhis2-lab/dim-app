import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { ReportTableCulumns } from '../../utils/table-config.util';
import { ReportState } from '../../state';
import { DIMReport } from '../../models/report.model';
import { getReportDetails } from '../../state/report.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';

@Component({
  selector: 'app-report-container',
  templateUrl: './report-container.component.html',
  styleUrls: ['./report-container.component.scss'],
})
export class ReportContainerComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: Array<string> = ReportTableCulumns;
  dataSource: MatTableDataSource<any>;
  integrationCreatedSUB$: Subscription;
  subscriptions: Array<Subscription> = [];
  today: Date;
  reportDetails: Array<DIMReport>;

  constructor(
    private reportState: Store<ReportState>,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.today = new Date();
    this.integrationCreatedSUB$ = this.reportState
      .pipe(
        select(getReportDetails),
        takeWhile((value: Array<DIMReport>) => value !== null)
      )
      .subscribe((reports: Array<DIMReport>) => {
        if (reports.length > 0) {
          this.reportDetails = reports;
        } else {
          this.router.navigate(['../generate'], { relativeTo: this.route });
        }
      });
    this.subscriptions.push(this.integrationCreatedSUB$);
  }

  ngOnDestroy(): void {
    this.reportDetails = [];
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  applyFilter(filterValue: string) {
    // this.integrationCreatedSUB$ = this.reportState
    //   .pipe(
    //     select(getReportDetails),
    //     takeWhile((value: Array<DIMReport>) => value !== null)
    //   )
    //   .subscribe((reports: Array<DIMReport>) => {
    //     if (reports.length > 0) {
    //       if (this.dataSource) {
    //         this.dataSource.filter = filterValue.trim().toLowerCase();
    //         if (this.dataSource.paginator) {
    //           this.dataSource.paginator.firstPage();
    //         }
    //       }
    //     }
    //   });
  }
}
