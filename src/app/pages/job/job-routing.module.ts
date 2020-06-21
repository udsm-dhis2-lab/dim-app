import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './containers/job/job.component';
import { CreateJobComponent } from './components/form/create-job/create-job.component';
import { EditJobComponent } from './components/form/edit-job/edit-job.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { JobListComponent } from './components/job-list/job-list.component';

const routes: Routes = [
  {
    path: '',
    component: JobComponent,
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
        component: JobListComponent,
      },
      {
        path: 'create',
        component: CreateJobComponent,
      },
      {
        path: 'edit/:id',
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
