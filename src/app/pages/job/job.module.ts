import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './components/job/job.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateJobComponent } from './components/form/create-job/create-job.component';
import { EditJobComponent } from './components/form/edit-job/edit-job.component';
import { DataElementSelectionComponent } from './components/selection/data-element-selection/data-element-selection.component';
import { IndicatorSelectionComponent } from './components/selection/indicator-selection/indicator-selection.component';
import { ProgramIndicatorSelectionComponent } from './components/selection/program-indicator-selection/program-indicator-selection.component';

@NgModule({
  declarations: [
    JobComponent,
    CreateJobComponent,
    EditJobComponent,
    DataElementSelectionComponent,
    IndicatorSelectionComponent,
    ProgramIndicatorSelectionComponent,
  ],
  imports: [CommonModule, JobRoutingModule, SharedModule],
})
export class JobModule {}
