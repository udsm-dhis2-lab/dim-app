import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './components/system/system.component';
import { EditSystemComponent } from './components/form/edit-system/edit-system.component';
import { CreateSystemComponent } from './components/form/create-system/create-system.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'create',
      },
      {
        path: 'create',
        component: CreateSystemComponent,
      },
      {
        path: 'edit',
        component: EditSystemComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
