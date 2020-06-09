import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './components/system/system.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateSystemComponent } from './components/form/create-system/create-system.component';
import { EditSystemComponent } from './components/form/edit-system/edit-system.component';


@NgModule({
  declarations: [SystemComponent, CreateSystemComponent, EditSystemComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule
  ]
})
export class SystemModule { }
