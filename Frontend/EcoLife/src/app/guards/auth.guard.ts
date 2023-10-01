import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
    const storageService = inject(StorageService);
    const router = inject(Router);
  
    const isLogged = storageService.isLoggedIn();
    if (isLogged) {
      return true;
    }
    router.navigate(["/login"]);
    return false;
};
