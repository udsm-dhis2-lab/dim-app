import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationManagementComponent } from './components/integration-management/integration-management.component';

const routes: Routes = [
  {
    path: '',
    component: IntegrationManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
