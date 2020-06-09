import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './components/batch/batch.component';
import { CreateBatchComponent } from './components/form/create-batch/create-batch.component';
import { EditBatchComponent } from './components/form/edit-batch/edit-batch.component';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
      },
      {
        path: 'create',
        component: CreateBatchComponent,
      },
      {
        path: 'edit',
        component: EditBatchComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatchRoutingModule {}
