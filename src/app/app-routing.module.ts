/**
 *
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

/**
 *
 * @params httpClient
 */
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

/**
 *
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/integration',
    pathMatch: 'full',
  },
  {
    path: 'integration',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'system',
    loadChildren: () =>
      import('./pages/system/system.module').then((m) => m.SystemModule),
  },
  {
    path: 'report',
    loadChildren: () =>
      import('./pages/report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'batch',
    loadChildren: () =>
      import('./pages/batch/batch.module').then((m) => m.BatchModule),
  },
  {
    path: 'job',
    loadChildren: () =>
      import('./pages/job/job.module').then((m) => m.JobModule),
  },
];

/**
 *
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
/**
 *
 */
export class AppRoutingModule {}
