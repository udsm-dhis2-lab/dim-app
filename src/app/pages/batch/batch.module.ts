import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchComponent } from './components/batch/batch.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBatchComponent } from './components/form/create-batch/create-batch.component';
import { EditBatchComponent } from './components/form/edit-batch/edit-batch.component';
import { JobSelectionComponent } from './components/selection/job-selection/job-selection.component';


@NgModule({
  declarations: [BatchComponent, CreateBatchComponent, EditBatchComponent, JobSelectionComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    SharedModule
  ]
})
export class BatchModule { }
