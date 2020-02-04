import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioGuard implements CanActivate {
  
  constructor( public _as: AuthService ){
    
  }
  
  canActivate():  boolean {
    
    if (this._as.userLogged.roles.includes('veterinario')) {
      return true;
      
    }
    console.log('no es veterinario, no pasa');
    return false;
  }
  
}
