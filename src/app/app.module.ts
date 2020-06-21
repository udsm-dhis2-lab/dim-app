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
import { NgxDhis2PeriodFilterModule } from '@iapps/ngx-dhis2-period-filter';
import { NgxDhis2DataFilterModule } from '@iapps/ngx-dhis2-data-filter';



/**
 *
 */
import { AppComponent } from './app.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { AppRoutingModule, HttpLoaderFactory } from './app-routing.module';
import { CoreModule, RouteSerializer } from './core';
import { reducers, metaReducers, appEffects } from './state/states/app.state';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CovalentCodeEditorModule } from '@covalent/code-editor';

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
    FormsModule,
    CoreModule,
    BrowserAnimationsModule,
    CovalentCodeEditorModule,
    NgxDhis2DataFilterModule,
    NgxDhis2PeriodFilterModule,
    MonacoEditorModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(appEffects),
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
