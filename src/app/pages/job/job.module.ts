import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './containers/job/job.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateJobComponent } from './components/form/create-job/create-job.component';
import { EditJobComponent } from './components/form/edit-job/edit-job.component';
import { DataElementSelectionComponent } from './components/selection/data-element-selection/data-element-selection.component';
import { IndicatorSelectionComponent } from './components/selection/indicator-selection/indicator-selection.component';
import { ProgramIndicatorSelectionComponent } from './components/selection/program-indicator-selection/program-indicator-selection.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { StoreModule } from '@ngrx/store';
import { _JobReducer } from './state';

@NgModule({
  declarations: [
    JobComponent,
    CreateJobComponent,
    EditJobComponent,
    DataElementSelectionComponent,
    IndicatorSelectionComponent,
    ProgramIndicatorSelectionComponent,
    ServiceMenuComponent,
    JobListComponent,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule,
    StoreModule.forFeature('job', _JobReducer),
  ],
})
export class JobModule {}
