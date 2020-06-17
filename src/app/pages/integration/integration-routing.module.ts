import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationComponent } from './containers/integration/integration.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { IntegrationListComponent } from './components/integration-list/integration-list.component';
import { CreateIntegrationComponent } from './components/form/create-integration/create-integration.component';
import { EditIntegrationComponent } from './components/form/edit-integration/edit-integration.component';

const routes: Routes = [
  {
    path: '',
    component: IntegrationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ServiceMenuComponent,
      },
      {
        path: 'dim-integration-section',
        component: ServiceMenuComponent,
      },
      {
        path: 'list',
        component: IntegrationListComponent,
      },
      {
        path: 'create',
        component: CreateIntegrationComponent,
      },
      {
        path: 'edit/:id',
        component: EditIntegrationComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntegrationRoutingModule {}
