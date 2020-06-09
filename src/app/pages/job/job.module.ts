import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './components/job/job.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateJobComponent } from './components/form/create-job/create-job.component';
import { EditJobComponent } from './components/form/edit-job/edit-job.component';


@NgModule({
  declarations: [JobComponent, CreateJobComponent, EditJobComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
