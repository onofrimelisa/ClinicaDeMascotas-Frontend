import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { IUsuarioLogin } from 'src/app/interfaces/IUsuarioLogin';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


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

  constructor( private http: HttpClient ) { }

  // =================================================================
  //                          Operaciones
  // =================================================================

  login( usuario: IUsuarioLogin ) {
    let url = URL_SERVICIOS + '/login';
    
    return this.http.post( url, usuario, httpOptions )
                .pipe(
                  map( (res: any) => {
                    // acá se setearía el token
                    console.log(res.headers.get("token"));
                  }),
                  catchError( err => throwError(err.error))  
                );
    
  }

}
