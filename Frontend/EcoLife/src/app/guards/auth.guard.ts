import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services';
import { JwtHelperService } from "@auth0/angular-jwt";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot) => {
    const storageService = inject(StorageService);
    const router = inject(Router);
    const jwtHelper = new JwtHelperService();
  
    const token = storageService.getToken();

    if (!token) {
      return router.navigate(["/login"]);
    }

    const data = jwtHelper.decodeToken(storageService.getToken()!)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    const roles = route.data['roles'] as Array<string>;

    if(!roles) {
      return true;
    }

    if(roles.includes(data)) {
      console.log(roles);
      console.log(data)
      console.log(route)
      return true;
    }

    return router.navigate(["/login"]);
}