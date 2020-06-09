import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './components/report/report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateReportComponent } from './components/form/create-report/create-report.component';
import { DataElementSelectionComponent } from './components/selection/data-element-selection/data-element-selection.component';
import { IndicatorSelectionComponent } from './components/selection/indicator-selection/indicator-selection.component';
import { ProgramIndicatorSelectionComponent } from './components/selection/program-indicator-selection/program-indicator-selection.component';

@NgModule({
  declarations: [
    ReportComponent,
    CreateReportComponent,
    DataElementSelectionComponent,
    IndicatorSelectionComponent,
    ProgramIndicatorSelectionComponent,
  ],
  imports: [CommonModule, ReportRoutingModule, SharedModule],
})
export class ReportModule {}
