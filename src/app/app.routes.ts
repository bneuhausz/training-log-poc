import { Routes } from '@angular/router';
import { signInGuard } from './shared/auth/sign-in-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home'),
    canActivate: [signInGuard()],
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./auth/sign-in/sign-in'),
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./auth/sign-up/sign-up'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];
