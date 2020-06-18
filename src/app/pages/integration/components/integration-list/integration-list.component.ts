import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as _ from 'lodash';

import { IntegrationTableCulumns } from '../../config/integration-table.config';
import { Observable, Subscription } from 'rxjs';
import { DIMIntegration } from '../../models/integration.model';
import {
  IntegrationState,
  LoadIntegrations,
  SetSelectedIntegration,
  DeleteIntegration,
} from '../../state';
import {
  getAllIntegrations,
  getDeletedIntegrationStatus,
} from '../../state/integration.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';

@Component({
  selector: 'app-integration-list',
  templateUrl: './integration-list.component.html',
  styleUrls: ['./integration-list.component.scss'],
})
export class IntegrationListComponent implements OnInit, OnDestroy {
  displayedColumns: Array<string> = IntegrationTableCulumns;
  systems$: Observable<Array<DIMIntegration>>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  subscriptions: Array<Subscription> = [];
  systemSUB$: Subscription;
  systemDeleteSUB$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private integrationState: Store<IntegrationState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.integrationState.dispatch(LoadIntegrations());
    this.systems$ = this.integrationState.pipe(select(getAllIntegrations));
    this.systemSUB$ = this.integrationState
      .pipe(select(getAllIntegrations))
      .subscribe((integrations: Array<DIMIntegration>) => {
        this.dataSource = new MatTableDataSource<DIMIntegration>(integrations);
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
    this.systemSUB$ = this.integrationState
      .pipe(select(getAllIntegrations))
      .subscribe((integrations: Array<DIMIntegration>) => {
        if (integrations) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
      });
    this.subscriptions.push(this.systemSUB$);
  }

  onEdit(integration: DIMIntegration) {
    this.integrationState.dispatch(SetSelectedIntegration({ integration }));
    this.router.navigate(['../edit/' + integration?.id], {
      relativeTo: this.route,
    });
  }

  onDelete(integration: DIMIntegration) {
    if (
      confirm(
        `Are you sure you want to delete Integration <${integration?.name}> with id <${integration?.id}> `
      )
    ) {
      this.integrationState.dispatch(DeleteIntegration({ integration }));
      this.systemDeleteSUB$ = this.integrationState
        .pipe(select(getDeletedIntegrationStatus))
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['./'], { relativeTo: this.route });
            OpenSnackBar(
              this.snackBar,
              `Integration "${integration?.name}" with id <${integration?.id}> is successfully deleted`,
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
