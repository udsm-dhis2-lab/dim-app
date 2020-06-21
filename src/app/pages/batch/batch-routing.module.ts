import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BatchComponent } from './containers/batch/batch.component';
import { CreateBatchComponent } from './components/form/create-batch/create-batch.component';
import { EditBatchComponent } from './components/form/edit-batch/edit-batch.component';
import { ServiceMenuComponent } from '../integration/components/service-menu/service-menu.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';

const routes: Routes = [
  {
    path: '',
    component: BatchComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ServiceMenuComponent,
      },
      {
        path: 'dim-system-section',
        component: ServiceMenuComponent,
      },
      {
        path: 'list',
        component: BatchListComponent,
      },
      {
        path: 'create',
        component: CreateBatchComponent,
      },
      {
        path: 'edit/:id',
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
