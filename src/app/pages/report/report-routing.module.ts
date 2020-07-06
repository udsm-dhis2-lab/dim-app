import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './containers/report/report.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { GenerateReportComponent } from './components/generate-report/generate-report.component';


const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ServiceMenuComponent,
      },
      {
        path: 'dim-report-section',
        component: ServiceMenuComponent,
      },
      {
        path: 'generate',
        component: GenerateReportComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
