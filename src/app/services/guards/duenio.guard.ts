import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DuenioGuard implements CanActivate {

  constructor( public _as: AuthService ){

  }
  
  canActivate():  boolean {
    
    if (this._as.userLogged.roles.includes('duenio')) {
      return true;
      
    }
    console.log('no es duenio, no pasa');
    return false;
  }
  
}
