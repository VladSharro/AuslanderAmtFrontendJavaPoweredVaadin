import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { StartApplicationComponent } from './Components/start-application/start-application.component';    
import { GuideComponent } from './Components/MainPagesComponents/guide/guide.component';
import { FaqScreenComponent } from './Components/MainPagesComponents/faq-screen/faq-screen.component';
import { DocumentsComponent } from './Components/MainPagesComponents/documents/documents.component';
import { ContactComponent } from './Components/MainPagesComponents/contact/contact.component';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { NonEuFirstAppComponent } from './Components/non-eu-first-app/non-eu-first-app.component';

export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "new-application", component: StartApplicationComponent},
    {path: "Guide", component: GuideComponent},
    {path: "FAQ", component: FaqScreenComponent},
    {path: "Documents", component: DocumentsComponent},
    {path:"Contact", component: ContactComponent},
    {path:"adminLogIn", component: AdminLoginComponent},
    {path: "nonEuFirstTimeApp", component:NonEuFirstAppComponent},

];
