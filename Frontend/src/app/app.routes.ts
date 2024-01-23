import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { StartApplicationComponent } from './Components/start-application/start-application.component';    
import { GuideComponent } from './Components/MainPagesComponents/guide/guide.component';
import { FaqScreenComponent } from './Components/MainPagesComponents/faq-screen/faq-screen.component';
import { DocumentsComponent } from './Components/MainPagesComponents/documents/documents.component';
import { ContactComponent } from './Components/MainPagesComponents/contact/contact.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { NonEuFirstAppComponent } from './Components/non-eu-first-app/non-eu-first-app.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { NonEuRenewAppComponent } from './Components/non-eu-renew-app/non-eu-renew-app.component';
import { DownloadApplicationComponent } from './Fixed_components/download-application/download-application.component';
import { StayDataRenewalComponent } from './Components/Application-components/stay-data-renewal/stay-data-renewal.component';
import { ContinueApplicationComponent } from './Components/continue-application/continue-application.component';
import { MaillingComponent } from './Components/mailling/mailling.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "new-application", component: StartApplicationComponent},
    {path: "continue-application", component: ContinueApplicationComponent},
    {path: "Guide", component: GuideComponent},
    {path: "FAQ", component: FaqScreenComponent},
    {path: "Documents", component: DocumentsComponent},
    {path: "Contact", component: ContactComponent},
    {path: "adminLogIn", component: AdminLoginComponent},
    {path: "nonEuFirstTimeApp", component:NonEuFirstAppComponent},
    {path: "nonEuRenewApp", component: NonEuRenewAppComponent},
    {path: "adminDashboard", component:AdminDashboardComponent},
    {path: "downloadApplication", component:DownloadApplicationComponent},
    {path: "mailling", component: MaillingComponent}

];
