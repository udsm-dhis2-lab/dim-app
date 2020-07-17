import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';
import { ReportComponent } from './containers/report/report.component';
import { StoreModule } from '@ngrx/store';
import { _ReportReducer } from './state';
import {
  _DatasetReducer,
  _DataReducer,
  _IntegratedSystemReducer,
} from './state/report.reducer';
import { DataSelectionComponent } from './components/selection/data-selection/data-selection.component';
import { ReportContainerComponent } from './components/report-container/report-container.component';

@NgModule({
  declarations: [
    ReportComponent,
    ServiceMenuComponent,
    GenerateReportComponent,
    DataSelectionComponent,
    ReportContainerComponent,
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    StoreModule.forFeature('report', _ReportReducer),
    StoreModule.forFeature('dataSet', _DatasetReducer),
    StoreModule.forFeature('data', _DataReducer),
    StoreModule.forFeature('integratedSystem', _IntegratedSystemReducer),
  ],
})
export class ReportModule {}
