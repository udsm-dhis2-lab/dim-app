import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchComponent } from './containers/batch/batch.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateBatchComponent } from './components/form/create-batch/create-batch.component';
import { EditBatchComponent } from './components/form/edit-batch/edit-batch.component';
import { JobSelectionComponent } from './components/selection/job-selection/job-selection.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';


@NgModule({
  declarations: [BatchComponent, CreateBatchComponent, EditBatchComponent, JobSelectionComponent, ServiceMenuComponent, BatchListComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    SharedModule
  ]
})
export class BatchModule { }
