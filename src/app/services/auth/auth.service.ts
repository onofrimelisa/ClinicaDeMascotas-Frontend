import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { IUsuarioLogin } from 'src/app/interfaces/IUsuario';
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

  userToken: string;

  constructor( private http: HttpClient,
               private router: Router ) { }
  
  // =================================================================
  //                          Login
  // =================================================================
  
  login( usuario: IUsuarioLogin ) {
    let url = URL_SERVICIOS + '/login';
    
    return this.http.post( url, usuario, httpOptions )
    .pipe(
      map( (res: any) => {
        this.userToken = res.token;
        this.guardarStorage( res.token );
        return res.usuario;
      }),
      catchError( err => throwError(err.error))  
      );
      
    }
  
  // =================================================================
  //                          Logout
  // =================================================================

  logout() {  
    this.userToken = '';
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
    
  // =================================================================
  //                          Storage
  // =================================================================
  
  guardarStorage( token: string ) {
    // tambien hay que guardar usuario loggeado
    localStorage.setItem('token', token);
  }

}
