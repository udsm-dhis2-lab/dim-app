import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateAuthComponent } from './components/form/create-auth/create-auth.component';
import { EditAuthComponent } from './components/form/edit-auth/edit-auth.component';
import { AuthComponent } from './containers/auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { _AuthReducer } from './state';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { AuthListComponent } from './components/auth-list/auth-list.component';

@NgModule({
  declarations: [AuthComponent, CreateAuthComponent, EditAuthComponent, ServiceMenuComponent, AuthListComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StoreModule.forFeature('auth', _AuthReducer),
  ],
})
export class AuthModule {}
