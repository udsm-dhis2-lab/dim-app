import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntegrationRoutingModule } from './integration-routing.module';
import { IntegrationComponent } from './containers/integration/integration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { IntegrationListComponent } from './components/integration-list/integration-list.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { CreateIntegrationComponent } from './components/form/create-integration/create-integration.component';
import { EditIntegrationComponent } from './components/form/edit-integration/edit-integration.component';
import { StoreModule } from '@ngrx/store';
import { _IntegrationReducer } from './state';
import { BatchSelectionComponent } from './components/selection/batch-selection/batch-selection.component';

@NgModule({
  declarations: [
    IntegrationComponent,
    IntegrationListComponent,
    ServiceMenuComponent,
    CreateIntegrationComponent,
    EditIntegrationComponent,
    BatchSelectionComponent,
  ],
  imports: [
    CommonModule,
    IntegrationRoutingModule,
    SharedModule,
    StoreModule.forFeature('integration', _IntegrationReducer),
  ],
})
export class IntegrationModule {}
