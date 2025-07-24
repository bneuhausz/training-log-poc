import { Routes } from '@angular/router';
import { signInGuard } from './shared/auth/sign-in-guard';
import { authRoutes } from './auth/auth.routes';

export const routes: Routes = [
  {
    path: '',
    title: 'Home',
    loadComponent: () => import('./home/home'),
    canActivate: [signInGuard()],
  },
  {
    path: '',
    children: [
      ...authRoutes,
    ],
  },
  {
    path: '**',
    redirectTo: '',
  }
];
