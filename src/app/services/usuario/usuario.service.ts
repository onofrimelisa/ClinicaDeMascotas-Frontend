import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { IUsuarioNuevo } from 'src/app/interfaces/IUsuario';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IUsuario } from '../../interfaces/IUsuario';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }
  
  // =================================================================
  //                          Operaciones
  // =================================================================

  agregarUsuario(usuario: IUsuarioNuevo) {
    let url = URL_SERVICIOS + '/usuario';
    
    return this.http.post( url, usuario, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  actualizarUsuario(usuario: IUsuario) {
    let url = `${ URL_SERVICIOS }/usuario/${ usuario.id }`;

    return this.http.put( url, usuario, httpOptions)
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

}
