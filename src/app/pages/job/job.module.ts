import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './components/job/job.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [JobComponent],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedModule
  ]
})
export class JobModule { }
