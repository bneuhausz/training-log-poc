import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';
import { map } from 'rxjs';

export const signInGuard = (): CanActivateFn => {
  return () => {
    const auth = inject(Auth);
    const router = inject(Router);

    return auth.firstLoad$.pipe(
      map(state => {
        if (state.session) {
          return true;
        }
        return router.parseUrl('sign-in');
      })
    );
  };
};
