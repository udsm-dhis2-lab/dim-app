import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateAuthComponent } from './components/form/create-auth/create-auth.component';
import { EditAuthComponent } from './components/form/edit-auth/edit-auth.component';


@NgModule({
  declarations: [AuthComponent, CreateAuthComponent, EditAuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
