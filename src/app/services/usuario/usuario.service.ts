import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { IUsuarioNuevo } from 'src/app/interfaces/IUsuario';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IUsuario } from '../../interfaces/IUsuario';
import { AuthService } from '../auth/auth.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient, 
              public _as: AuthService ) { }
  
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
    let url = `${ URL_SERVICIOS }/api/usuario/${ usuario.id }`;

    return this.http.put( url, usuario, httpOptions )
                .pipe(
                  map( (resp: any)=>{
                    this._as.guardarStorage( this._as.userToken, usuario);
                    return resp;

                  },
                  catchError( err => throwError(err.error))  
                  )
                );
  }

}
