import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './containers/system/system.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSystemComponent } from './components/form/create-system/create-system.component';
import { EditSystemComponent } from './components/form/edit-system/edit-system.component';
import { SystemListComponent } from './components/system-list/system-list.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { StoreModule } from '@ngrx/store';
import { _SystemReducer } from './state';

@NgModule({
  declarations: [
    SystemComponent,
    CreateSystemComponent,
    EditSystemComponent,
    SystemListComponent,
    ServiceMenuComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
    StoreModule.forFeature('system', _SystemReducer),
  ],
})
export class SystemModule {}
