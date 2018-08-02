import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard.service';


import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';
import { ProgramsComponent } from './programs/programs.component';
import { ZeroDiscoverComponent } from './zero-discover/zero-discover.component';
import { SubmissionsComponent } from './submissions/submissions.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { MessagesComponent } from './messages/messages.component';
import { ActivateComponent } from './activate/activate.component';
import { LaunchnewProgramComponent } from './launch-newprogram/newprogram.component';
import { ProgramDetailsComponent } from './program-details/program-details.component';
import { SubmissionsDueComponent } from './rewards/due/due.component';
import { SubmissionsInvoiceComponent } from './rewards/invoice/invoice.component';
import { SubmissionsReceiptComponent } from './rewards/receipt/receipt.component';
import { RewardsStatusComponent } from './rewards/status/status.component';
import { RewardsReceiptRComponent } from './rewards/receipt_r/receipt_r.component';


import { LoggedoutComponent } from './loggedout/loggedout.component';
import { ProgramDetailsResearchComponent } from './program-details-research/program-details-research.component';
import { SubmitReportComponent } from './submit-report/submit-report.component';




const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
    { path: 'halloffame', canActivate: [AuthGuard], component: HallOfFameComponent },
    { path: 'programs', canActivate: [AuthGuard], component: ProgramsComponent },
    { path: 'zerodiscover', canActivate: [AuthGuard], component: ZeroDiscoverComponent },
    { path: 'submissions', canActivate: [AuthGuard], component: SubmissionsComponent },
    { path: 'myaccount', canActivate: [AuthGuard], component: MyAccountComponent },
    { path: 'messages', canActivate: [AuthGuard], component: MessagesComponent },
    { path: 'activate/:token', canActivate: [AuthGuard], component: ActivateComponent },
    { path: 'programlaunch', canActivate: [AuthGuard], component: LaunchnewProgramComponent },
    { path: 'programdetails/:pid', canActivate: [AuthGuard], component: ProgramDetailsComponent },
    { path: 'rewards/due', canActivate: [AuthGuard], component: SubmissionsDueComponent },
    { path: 'rewards/invoice', canActivate: [AuthGuard], component: SubmissionsInvoiceComponent },
    { path: 'rewards/receipt', canActivate: [AuthGuard], component: SubmissionsReceiptComponent },
    { path: 'rewards/status', canActivate: [AuthGuard], component: RewardsStatusComponent },
    { path: 'rewards/receiptr', canActivate: [AuthGuard], component: RewardsReceiptRComponent },


    
    {path:'submit-report/:prgId/:PrgName',component:SubmitReportComponent},
    {path:'loggedOut',component:LoggedoutComponent},
    {path:'programdetailsR/:pid',component:ProgramDetailsResearchComponent},
    { path: '**', redirectTo: '' },
];



@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes,{ useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}