import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntegrationManagementComponent } from './components/integration-management/integration-management.component';
import { CreateIntegrationComponent } from './components/form/create-integration/create-integration.component';
import { EditIntegrationComponent } from './components/form/edit-integration/edit-integration.component';

@NgModule({
  declarations: [
    IntegrationManagementComponent,
    CreateIntegrationComponent,
    EditIntegrationComponent,
  ],
  imports: [CommonModule, SharedModule, HomeRoutingModule],
})
export class HomeModule {}
