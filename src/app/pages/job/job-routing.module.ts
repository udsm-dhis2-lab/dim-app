import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './components/job/job.component';
import { CreateJobComponent } from './components/form/create-job/create-job.component';
import { EditJobComponent } from './components/form/edit-job/edit-job.component';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create'
      },
      {
        path: 'create',
        component: CreateJobComponent,
      },
      {
        path: 'edit',
        component: EditJobComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRoutingModule {}
