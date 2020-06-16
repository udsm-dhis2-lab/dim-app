import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import * as _ from 'lodash';

import { SystemService } from '../../services/system.service';
import { SystemState } from '../../state/integration.state';
import { Store, select } from '@ngrx/store';
import { getAllSystems } from '../../state/integration.selector';
import { LoadSystems, SetSelectedSystem } from '../../state';
import { DIMSystem } from 'src/app/pages/home/models/integration.model';
import { SystemTableCulumns } from '../../config/system-table.config';

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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private systemState: Store<SystemState>
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

  applyFilter(e: any) {}

  onEdit(system: DIMSystem) {
    this.systemState.dispatch(SetSelectedSystem({ system }));
    this.router.navigate(['../edit/' + system?.id], { relativeTo: this.route });
  }

  onDelete() {
    //
  }

  onViewMore() {
    //
  }
}
