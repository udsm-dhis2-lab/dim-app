import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

import * as _ from 'lodash';

import { AuthTableCulumns } from '../../config/auth-table.config';
import { DIMAuth } from '../../models/auth.model';
import { AuthState, LoadAuths, SetSelectedAuth, DeleteAuth } from '../../state';
import { getAllAuth, getDeletedAuthStatus } from '../../state/auth.selector';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';

@Component({
  selector: 'app-auth-list',
  templateUrl: './auth-list.component.html',
  styleUrls: ['./auth-list.component.scss'],
})
export class AuthListComponent implements OnInit, OnDestroy {
  displayedColumns: Array<string> = AuthTableCulumns;
  auth$: Observable<Array<DIMAuth>>;
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  subscriptions: Array<Subscription> = [];
  authSUB$: Subscription;
  authDeleteSUB$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authState: Store<AuthState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authState.dispatch(LoadAuths());
    this.auth$ = this.authState.pipe(select(getAllAuth));
    this.authSUB$ = this.authState
      .pipe(select(getAllAuth))
      .subscribe((auths: Array<DIMAuth>) => {
        this.dataSource = new MatTableDataSource<DIMAuth>(auths);
        if (this.dataSource) {
          this.dataSource.paginator = this.paginator;
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
        }
      });
    this.subscriptions.push(this.authSUB$);
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
    this.authSUB$ = this.authState
      .pipe(select(getAllAuth))
      .subscribe((auths: Array<DIMAuth>) => {
        if (auths) {
          this.dataSource.filter = filterValue.trim().toLowerCase();
          if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
          }
        }
      });
    this.subscriptions.push(this.authSUB$);
  }

  onEdit(auth: DIMAuth) {
    this.authState.dispatch(SetSelectedAuth({ auth: auth }));
    this.router.navigate(['../edit/' + auth?.id], {
      relativeTo: this.route,
    });
  }

  onDelete(auth: DIMAuth) {
    if (
      confirm(
        `Are you sure you want to delete Auth <${auth?.username}> with id <${auth?.id}> `
      )
    ) {
      this.authState.dispatch(DeleteAuth({ auth: auth }));
      this.authDeleteSUB$ = this.authState
        .pipe(select(getDeletedAuthStatus))
        .subscribe((status: boolean) => {
          if (status) {
            this.router.navigate(['./'], { relativeTo: this.route });
            OpenSnackBar(
              this.snackBar,
              `Auth "${auth?.username}" with id <${auth?.id}> is successfully deleted`,
              '',
              'success-snackbar'
            );
          }
        });
      this.subscriptions.push(this.authDeleteSUB$);
    }
  }

  onViewMore() {
    //
  }
}
