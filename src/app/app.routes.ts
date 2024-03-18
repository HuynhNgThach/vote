import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'signin', component: SigninComponent },
            { path: 'signup', component: SignupComponent },
        ],
        canActivate: [authGuard]
    },


];
