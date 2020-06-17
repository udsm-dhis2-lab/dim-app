import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './containers/integration/integration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntegrationListComponent } from './components/integration-list/integration-list.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';


@NgModule({
  declarations: [IntegrationComponent, IntegrationListComponent, ServiceMenuComponent],
  imports: [
    CommonModule,
    IntegrationRoutingModule,
    SharedModule
  ]
})
export class IntegrationModule { }
