import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusPageComponent } from './status-page/status-page.component';
import { DeviceIpAddressesComponent } from './cards/device-ip-addresses/device-ip-addresses.component';
import { MeshRfComponent } from './cards/mesh-rf/mesh-rf.component';
import { SystemInfoComponent } from './cards/system-information/system-info.component';
import { LocationComponent } from './cards/location/location.component';
import { PerformanceComponent } from './cards/performance/performance.component';
import { MemoryAndStorageComponent } from './cards/memory-and-storage/memory-and-storage.component';
import { HeaderComponent } from './header/header.component';
import { NodesPageComponent } from './nodes-page/nodes-page.component';
import { ScanPageComponent } from './scan-page/scan-page.component';
import { ChartsPageComponent } from './charts-page/charts-page.component';
import { SignalChartComponent } from './charts-page/signal-chart/signal-chart.component';
import { DatePipe } from '@angular/common';
import { SignalIconComponent } from './scan-page/signal-icon/signal-icon.component';
import { SortIconComponent } from './scan-page/sort-icon/sort-icon.component';
import { ScanListResultsComponent } from './scan-page/scan-list-results/scan-list-results.component';
import { NgArrayPipesModule } from 'ngx-pipes';

import { LoadingMessageComponent } from './loading-message/loading-message.component';
import { LoadingMessageInterceptor } from './loading-message/loading-message-inteceptor.service';

import { ToneComponent } from './charts-page/tone/tone.component';
import { AudioContextModule } from 'angular-audio-context';
import { FormsModule } from '@angular/forms';
import { LineChartModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/**
 * These are the cards that are displayed on the Status Page
 */
const CardComponents = [
  DeviceIpAddressesComponent,
  MeshRfComponent,
  SystemInfoComponent,
  LocationComponent,
  PerformanceComponent,
  MemoryAndStorageComponent
];

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingMessageInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StatusPageComponent,
    NodesPageComponent,
    LoadingMessageComponent,
    ...CardComponents,
    ScanPageComponent,
    ChartsPageComponent,
    SignalChartComponent,
    SignalIconComponent,
    SortIconComponent,
    ScanListResultsComponent,
    ToneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgArrayPipesModule,
    AudioContextModule.forRoot('balanced'),
    FormsModule,
    LineChartModule
  ],
  providers: [
    httpInterceptorProviders,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
