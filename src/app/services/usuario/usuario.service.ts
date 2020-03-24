import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICIOS, URL_PRIVADA } from 'src/app/config/config';
import { IUsuarioNuevo } from 'src/app/interfaces/IUsuario';
import { catchError, map, filter } from 'rxjs/operators';
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

  actualizarEstado(usuario: IUsuario) {
    let url = `${ URL_SERVICIOS }/api/usuario/${ usuario.id }`;
    console.log(usuario.activo);
    
    usuario.activo = !usuario.activo;
    console.log(usuario.activo);

    return this.http.put( url, usuario, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                  )
                
  }

  // ###############################################################################
  //										OPERACIONES POR ROL
  // ###############################################################################
  getPorRol( rol: string ){
    let url = `${ URL_PRIVADA }/usuario/rol/${ rol }`;

    return this.http.get( url, httpOptions ).pipe(
      catchError( err => throwError(err.error)) 
    )
  }

  getVeterinariosActivos(){
    let url = `${ URL_PRIVADA }/usuario/rol/veterinario`;

    return this.http.get( url, httpOptions ).pipe(
      map( (resp: any)=> {
        let veterinarios_aux = resp.usuarios;
        veterinarios_aux.filter( (vet)=> { vet.activo });
        return veterinarios_aux;

    }))
  }

  eliminarPorRol( rol: string, id: number ){
    let url = `${ URL_PRIVADA }/usuario/${ rol }/${ id }`;

    return this.http.delete( url, httpOptions ).pipe(
      catchError( err => throwError(err.error)) 
    )
  }

}
