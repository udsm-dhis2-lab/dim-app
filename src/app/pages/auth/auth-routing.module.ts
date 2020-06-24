import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAuthComponent } from './components/form/create-auth/create-auth.component';
import { EditAuthComponent } from './components/form/edit-auth/edit-auth.component';
import { AuthComponent } from './containers/auth/auth.component';
import { ServiceMenuComponent } from './components/service-menu/service-menu.component';
import { AuthListComponent } from './components/auth-list/auth-list.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ServiceMenuComponent,
      },
      {
        path: 'dim-auth-section',
        component: ServiceMenuComponent,
      },
      {
        path: 'list',
        component: AuthListComponent,
      },
      {
        path: 'create',
        component: CreateAuthComponent,
      },
      {
        path: 'edit/:id',
        component: EditAuthComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
