import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'state-management',
    title: 'State management',
    loadComponent: async () => (await import('./state-management/state-management/state-management.component')).StateManagementComponent
  }
]