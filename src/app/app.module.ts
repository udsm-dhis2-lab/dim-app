/**
 *
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  StoreRouterConnectingModule,
  DefaultRouterStateSerializer,
  RouterStateSerializer,
} from '@ngrx/router-store';

/**
 *
 */
import { NgxDhis2HttpClientModule } from '@iapps/ngx-dhis2-http-client';
import { NgxDhis2MenuModule } from '@iapps/ngx-dhis2-menu';

/**
 *
 */
import { AppComponent } from './app.component';
import { AppRoutingModule, HttpLoaderFactory } from './app-routing.module';
import { CoreModule, RouteSerializer } from './core';
import { metaReducers, reducers } from './store/reducers';
import { effects } from './store/effects';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
/**
 *
 */
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    NgxDhis2HttpClientModule.forRoot({
      version: 1,
      namespace: 'icodebible',
      models: {
        organisationUnits: 'id,level',
        organisationUnitLevels: 'id,level',
        organisationUnitGroups: 'id',
      },
    }),

    NgxDhis2MenuModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [{ provide: RouterStateSerializer, useClass: RouteSerializer }],
  bootstrap: [AppComponent],
})
/**
 *
 */
export class AppModule {}
