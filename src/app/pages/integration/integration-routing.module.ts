import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntegrationComponent } from './containers/integration/integration.component';


const routes: Routes = [
  {
    path: '',
    component: IntegrationComponent,
    // children: [
    //   {
    //     path: '',
    //     pathMatch: 'full',
    //     component: ServiceMenuComponent,
    //   },
    //   {
    //     path: 'dim-system-section',
    //     component: ServiceMenuComponent,
    //   },
    //   {
    //     path: 'list',
    //     component: SystemListComponent,
    //   },
    //   {
    //     path: 'create',
    //     component: CreateSystemComponent,
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: EditSystemComponent,
    //   },
    // ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntegrationRoutingModule { }
