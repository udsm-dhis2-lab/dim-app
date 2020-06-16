import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './containers/system/system.component';
import { EditSystemComponent } from './components/form/edit-system/edit-system.component';
import { CreateSystemComponent } from './components/form/create-system/create-system.component';
import { SystemListComponent } from './components/system-list/system-list.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
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
        component: SystemListComponent,
      },
      {
        path: 'create',
        component: CreateSystemComponent,
      },
      {
        path: 'edit/:id',
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
