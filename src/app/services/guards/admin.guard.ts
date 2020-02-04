import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public _as: AuthService ){

  }


  canActivate():  boolean {
    if (this._as.userLogged.roles.includes('admin')) {
      return true;
      
    }
    console.log('no es admin, no pasa');
    return false;
  }
  
}
