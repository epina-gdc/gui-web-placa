import { inject } from '@angular/core';
import { CanActivateChildFn, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '@core/services/auth';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  return checkAuth(state);
};

const checkAuth = (state: RouterStateSnapshot): Observable<boolean> => {
  const auth = inject(AuthService);
  if (localStorage.getItem('PLACA_TOKEN')) {
    return of(true);
  }
  auth.cerrarSesion();
  return of(false);
};
