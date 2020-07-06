import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';
import { ReportComponent } from './containers/report/report.component';

@NgModule({
  declarations: [
    ReportComponent,
    ServiceMenuComponent,
    GenerateReportComponent,
  ],
  imports: [CommonModule, ReportRoutingModule, SharedModule],
})
export class ReportModule {}
