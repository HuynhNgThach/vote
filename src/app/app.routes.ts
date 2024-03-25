import { Routes } from '@angular/router';
import { authGuard } from '@share/guards';

export const routes: Routes = [
    {
        path: '',
        loadChildren: async () => (await import('@pages/dashboard')).routes,
        canActivate: [authGuard],
    },
    {
        path: 'auth',
        loadChildren: async () => (await import('@pages/auth')).routes,
        canActivate: [authGuard],
    },
    {
        path: 'learn',
        loadChildren: async () => (await import('@pages/learn')).routes
    },
    {
        path: '**',
        loadComponent: async () => (await import('@pages/not-found/not-found.component')).NotFoundComponent,
    },
];
