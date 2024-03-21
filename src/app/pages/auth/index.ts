import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: 'signin',
        title: 'Signin',
        loadComponent: async () => (await import('./signin/signin.component')).SigninComponent
    },
    {
        path: 'signup',
        title: 'Signup',
        loadComponent: async () => (await import('./signup/signup.component')).SignupComponent
    }
]