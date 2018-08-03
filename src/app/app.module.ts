import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';


import { AppComponent } from './app.component';








import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LaunchnewProgramComponent } from './launch-newprogram/newprogram.component';

import { SubmissionsDueComponent } from './rewards/due/due.component';
import { SubmissionsInvoiceComponent } from './rewards/invoice/invoice.component';
import { SubmissionsReceiptComponent } from './rewards/receipt/receipt.component';
import { RewardsStatusComponent } from './rewards/status/status.component';
import { RewardsReceiptRComponent } from './rewards/receipt_r/receipt_r.component';

import { BaseService } from './base-service.service'
import { ConfigService } from './config';
// import { EqualValidator } from './EqualValidator';
import { FilterPipe } from './filter.pipe';


//  import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { ProgramsComponent } from './programs/programs.component';
import { ZeroDiscoverComponent } from './zero-discover/zero-discover.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ActivateComponent } from './activate/activate.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './app.routing.modules';

// import { AuthGuard } from './authGuard.service';

//for Admin

import { LoggedoutComponent } from './loggedout/loggedout.component';
import { ProgramDetailsResearchComponent } from './program-details-research/program-details-research.component';
import { SubmitReportComponent } from './submit-report/submit-report.component';

import {  XHRBackend, ConnectionBackend, RequestOptions } from '@angular/http';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthenticationService } from './core/auth/auth.service';
import { HttpService } from './core/http/http.service';
import { HttpCacheService } from './core/http/http-cache.service';

import { HomeService } from './home/home.service';
import { DashboardService } from './dashboard/dashboard.service';
import { HallOfFameService } from './hall-of-fame/hall-of-fame.service';
import { ProgramService } from './programs/program.service';
import { ProgramDetailsService } from './program-details/program-details.service';
import { SubmissionsService } from './submissions/submissions.service';
 
export function createHttpService(backend: ConnectionBackend,
  defaultOptions: RequestOptions,
  httpCacheService: HttpCacheService,
  authService: AuthenticationService) {
return new HttpService(backend, defaultOptions, httpCacheService, authService);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    HallOfFameComponent,
    ProgramsComponent,
    ZeroDiscoverComponent,
    SubmissionsComponent,
    MyAccountComponent,
    HeaderComponent,
    FooterComponent,
    FilterPipe,
    ActivateComponent,
    LaunchnewProgramComponent,
    SubmissionsDueComponent,
    SubmissionsInvoiceComponent,
    SubmissionsReceiptComponent,
    RewardsStatusComponent,
    RewardsReceiptRComponent,
    MessagesComponent,
    ProgramDetailsComponent,
    LoggedoutComponent,
    ProgramDetailsResearchComponent,
    SubmitReportComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    OrderModule,
    RouterModule.forRoot(appRoutes,{ useHash: true })
  ],
  providers: [
    ConfigService, 
    BaseService,
    AuthGuard, 
    AuthenticationService,
    HttpService,
    HttpCacheService,
    {
      provide: HttpService,
      deps: [XHRBackend, RequestOptions, HttpCacheService, AuthenticationService],
      useFactory: createHttpService
    },
    HomeService,
    DashboardService,
    HallOfFameService,
    ProgramService,
    ProgramDetailsService,
    SubmissionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



//{ provide: LocationStrategy, useClass: HashLocationStrategy },