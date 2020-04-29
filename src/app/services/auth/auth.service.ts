import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { IUsuarioLogin, IUsuario } from 'src/app/interfaces/IUsuario';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string = '';
  userLogged: IUsuario = null;
  // Roles
  admin: boolean = false;
  duenio: boolean = false;
  veterinario: boolean = false;

  constructor( private http: HttpClient,
               private router: Router ) { 
    this.cargarStorage();
  }
  
  // =================================================================
  //                          Login
  // =================================================================
  
  login( usuario: IUsuarioLogin ) {
    let url = URL_SERVICIOS + '/login';
    
    return this.http.post( url, usuario, httpOptions )
    .pipe(
      map( (res: any) => {
        this.userToken = res.token;
        this.userLogged = res.usuario;
        let roles = res.usuario.roles;
        if ( roles.indexOf('admin') > -1 ) {
          this.admin = true;
        }
        if ( roles.indexOf('duenio') > -1 ) {
          this.duenio = true;
        }
        if ( roles.indexOf('veterinario') > -1 ) {
          this.veterinario = true;
        }
        this.guardarStorage(res.token, res.usuario);
        return this.userLogged;
      }),
      catchError( err => throwError(err.error))  
      );
      
    }
  
  // =================================================================
  //                          Logout
  // =================================================================

  logout() {
    localStorage.removeItem('modo');  
    this.userToken = '';
    this.userLogged = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.admin = false;
    this.veterinario = false;
    this.duenio = false;
    this.router.navigate(['/home']);
  }

  // =================================================================
  //                          Autenticación
  // =================================================================

  estaLoggeado() {
    return ( this.userToken.length > 5 && this.userLogged ) ? true : false;
  }

    
  // =================================================================
  //                          Storage
  // =================================================================
  
  private cargarStorage() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
      this.userLogged = JSON.parse(localStorage.getItem('user'));
      let roles = this.userLogged.roles;
      if ( roles.indexOf('admin') > -1 ) {
        this.admin = true;
      }
      if ( roles.indexOf('duenio') > -1 ) {
        this.duenio = true;
      }
      if ( roles.indexOf('veterinario') > -1 ) {
        this.veterinario = true;
      }
    }else{
      this.userLogged = null;
      this.userToken = '';
    }
  }

  public guardarStorage( token: string, user: IUsuario){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.userLogged = user;
    this.userToken = token;
  }

}
