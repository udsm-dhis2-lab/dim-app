import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationManagementComponent } from './components/integration-management/integration-management.component';
import { CreateIntegrationComponent } from './components/form/create-integration/create-integration.component';
import { EditIntegrationComponent } from './components/form/edit-integration/edit-integration.component';

const routes: Routes = [
  {
    path: '',
    component: IntegrationManagementComponent,
    children: [
      {
        path: 'create',
        component: CreateIntegrationComponent,
      },
      {
        path: 'edit',
        component: EditIntegrationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
