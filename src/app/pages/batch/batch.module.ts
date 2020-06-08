import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { BatchComponent } from './components/batch/batch.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [BatchComponent],
  imports: [
    CommonModule,
    BatchRoutingModule,
    SharedModule
  ]
})
export class BatchModule { }
