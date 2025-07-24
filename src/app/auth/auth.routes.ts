import { Routes } from "@angular/router";

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    title: 'Sign In',
    loadComponent: () => import('./sign-in/sign-in'),
  },
  {
    path: 'sign-up',
    title: 'Sign Up',
    loadComponent: () => import('./sign-up/sign-up'),
  },
];