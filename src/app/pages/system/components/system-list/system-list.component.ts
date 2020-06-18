import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';

import { SystemState } from '../../state/system.state';
import { Store, select } from '@ngrx/store';
import {
  getAllSystems,
  getDeletedSystemStatus,
} from '../../state/system.selector';
import { LoadSystems, SetSelectedSystem, DeleteSystem } from '../../state';
import { SystemTableCulumns } from '../../config/system-table.config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { DIMSystem } from '../../models/system.model';

@Component({
  selector: 'app-system-list',
  templateUrl: './system-list.component.html',
  styleUrls: ['./system-list.component.scss'],
})
export class SystemListComponent implements OnInit, OnDestroy {
  displayedColumns: Array<string> = SystemTableCulumns;
  systems$: Observable<Array<DIMSystem>>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  subscriptions: Array<Subscription> = [];
  systemSUB$: Subscription;
  systemDeleteSUB$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private systemState: Store<SystemState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.systemState.dispatch(LoadSystems());
    this.systems$ = this.systemState.pipe(select(getAllSystems));
    this.systemSUB$ = this.systemState
      .pipe(select(getAllSystems))
      .subscribe((systems: Array<DIMSystem>) => {
        this.dataSource = new MatTableDataSource<DIMSystem>(systems);
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
    this.systemSUB$ = this.systemState
      .pipe(select(getAllSystems))
      .subscribe((systems: Array<DIMSystem>) => {
        if (systems) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
      });
    this.subscriptions.push(this.systemSUB$);
  }

  onEdit(system: DIMSystem) {
    this.systemState.dispatch(SetSelectedSystem({ system }));
    this.router.navigate(['../edit/' + system?.id], { relativeTo: this.route });
  }

  onDelete(system: DIMSystem) {
    if (
      confirm(
        `Are you sure you want to delete system <${system?.name}> with id <${system?.id}> `
      )
    ) {
      this.systemState.dispatch(DeleteSystem({ system }));
      this.systemDeleteSUB$ = this.systemState
        .pipe(select(getDeletedSystemStatus))
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['./'], { relativeTo: this.route });
            OpenSnackBar(
              this.snackBar,
              `System "${system?.name}" with id <${system?.id}> is successfully deleted`,
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
