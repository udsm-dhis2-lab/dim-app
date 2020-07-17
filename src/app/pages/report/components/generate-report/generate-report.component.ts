import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import * as _ from 'lodash';
import { DataEntryField } from 'src/app/shared/models/form.model';
import { DIMSystem } from 'src/app/pages/system/models/system.model';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import {
  ReportState,
  LoadDatasets,
  LoadDatas,
  LoadIntegratedSystems,
  GenerateReport,
} from '../../state';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { SystemService } from 'src/app/pages/system/services/system.service';
import { DIMReport } from '../../models/report.model';
import {
  getDatasets,
  getDatas,
  getIntegratedSystems,
  getReportDetails,
} from '../../state/report.selector';
import { PeriodSelection, Item } from '../../models/period.model';
import { ResponseStatusConfig } from '../../config/response-status.config';
import { ResponseStatus } from '../../models/response-status.model';
import { Dataset } from '../../models/dataset.model';
import { IntegratedSystem } from '../../models/system.model';
import { Data } from '../../models/data.model';
import { OpenSnackBar } from 'src/app/shared/helpers/snackbar.helper';
import { ReportMetadata } from '../../models/report-metadata.model';
import { MatTableDataSource } from '@angular/material/table';
import { ReportTableCulumns } from '../../utils/table-config.util';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { take, first, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss'],
})
export class GenerateReportComponent implements OnInit, OnDestroy {
  // matcher = new MyErrorStateMatcher();
  @Output() reportFormEventEmitter = new EventEmitter();
  reportFormEntries: DataEntryField = _.clone(_.create());
  systems: Array<DIMSystem | any>;
  systems$: Observable<Array<DIMSystem | any>>;
  isUpdating: boolean;
  subscriptions: Array<Subscription> = [];
  generateReportForm: FormGroup = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    dataSet: new FormControl(),
    status: new FormControl(),
    sourceSystem: new FormControl(),
    destinationSystem: new FormControl(),
  });

  selectedData: Array<Data>;

  // Subscriptions
  formSUB$: Subscription;
  integrationCreatedSUB$: Subscription;
  createdIntegrationSUB$: Subscription;
  systemsSUB$: Subscription;
  errorSUB$: Subscription;
  userSUB$: Subscription;

  selectedPeriodItems: any[] = [];
  selectedDataItems: any[] = [];
  selectedDataGroups: any[] = [];
  periodFilterConfig: any = {
    singleSelection: false,
    emitOnSelection: true,
    childrenPeriodSortOrder: 'ASC',
    allowDateRangeSelection: true,
    allowRelativePeriodSelection: true,
    allowFixedPeriodSelection: true,
  };
  dataFilterConfig = {
    singleSelection: false,
    emitOnSelection: true,
    enabledSelections: ['in', 'de'],
    showGroupingButton: false,
  };

  responseStatus: Array<ResponseStatus> = ResponseStatusConfig;
  datasets$: Observable<Array<Dataset>>;
  datas$: Observable<Array<Dataset>>;
  integratedSystems$: Observable<Array<IntegratedSystem>>;
  integratedSystems: Array<IntegratedSystem>;
  selectedPeriodType: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  displayedColumns: Array<string> = ReportTableCulumns;
  dataSource: MatTableDataSource<any>;
  reports: Array<DIMReport>;

  constructor(
    private reportState: Store<ReportState>,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private systemService: SystemService
  ) {}

  ngOnInit(): void {
    this.isUpdating = false;
    this.selectedPeriodType = 'Monthly';
    this.reportState.dispatch(LoadDatasets());
    this.reportState.dispatch(LoadDatas());
    this.reportState.dispatch(LoadIntegratedSystems());
    this.datasets$ = this.reportState.pipe(select(getDatasets));
    this.datas$ = this.reportState.pipe(select(getDatas));
    this.integratedSystems$ = this.reportState.pipe(
      select(getIntegratedSystems)
    );
    this.integratedSystems$.subscribe(
      (integratedSystem: Array<IntegratedSystem>) => {
        this.integratedSystems = integratedSystem;
      }
    );
    this.systemsSUB$ = this.systemService
      .getSystems()
      .subscribe((systems: Array<DIMSystem>) => {
        this.systems = systems;
      });
    this.subscriptions.push(this.userSUB$);
    this.subscriptions.push(this.formSUB$);
    this.subscriptions.push(this.systemsSUB$);
  }

  getEditorHeight(e: any) {
    //
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      if (subscription) {
        subscription.unsubscribe();
      }
    }
  }

  onPeriodUpdate(periods: PeriodSelection, action: string) {
    const selectedPeriodItems = _.map(periods?.items || [], (item: Item) => {
      return {
        id: item?.id,
        name: item?.name,
        type: item?.type,
      };
    });
    const formEntries = {
      ...this.reportFormEntries,
      periods: selectedPeriodItems,
    };
    this.reportFormEntries = formEntries;
  }

  // onDataUpdate(datas: DataSelection, action: string) {
  //   const selectedDataItems = _.map(
  //     datas?.items || [],
  //     (item: DataItem) => item
  //   );
  //   const mDx = {
  //     ...this.reportFormEntries.dx,
  //     data: selectedDataItems,
  //   };
  //   const formEntries = { ...this.reportFormEntries, dx: mDx };
  //   this.reportFormEntries = formEntries;
  // }

  onSubmitForm(): void {
    const reportMetadata: ReportMetadata = {
      ...this.generateReportForm.value,
      ...this.reportFormEntries,
    };
    this.isUpdating = true;
    this.reportState.dispatch(GenerateReport({ reportMetadata }));
    this.integrationCreatedSUB$ = this.reportState
      .pipe(
        select(getReportDetails),
        takeWhile((value: Array<DIMReport>) => value !== null)
      )
      .subscribe((reports: Array<DIMReport>) => {
        if (reports.length > 0) {
          this.isUpdating = false;
          this.dataSource = new MatTableDataSource<DIMReport>(reports);
          if (this.dataSource) {
            this.generateReportForm.reset();
            this.router.navigate(['../report'], { relativeTo: this.route });
            this.dataSource.paginator = this.paginator;
            if (this.sort) {
              this.dataSource.sort = this.sort;
            }
          }
          OpenSnackBar(
            this.snackBar,
            `DIM Report for data exchange is successfully generated`,
            '',
            'success-snackbar'
          );
        }
      });
    this.subscriptions.push(this.integrationCreatedSUB$);
  }

  onSelectItemList(e: any, criteria: any) {
    this.getOrgUnitsFormValues(e, criteria);
    if (e) {
      if (criteria === 'datas') {
        this.selectedData = e;
      }
    }
  }

  getOrgUnitsFormValues(result?: any, criteria?: any) {
    if (criteria === 'datas') {
      this.reportFormEntries = {
        ..._.clone(this.reportFormEntries),
        datas: this.getIdProp(result),
      };
    }
    this.reportFormEventEmitter.emit(_.clone(this.reportFormEntries));
  }

  getIdProp(results: any[]) {
    return results
      ? [
          ..._.map(results, (result: any) => {
            return _.mapKeys(result, (value: string, key: string) => {
              return key;
            });
          }),
        ]
      : [];
  }

  onBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
