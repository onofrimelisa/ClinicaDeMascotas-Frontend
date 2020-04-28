import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_PRIVADA } from 'src/app/config/config';
import { IMascotaNueva, IMascota } from 'src/app/interfaces/IMascota';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  public notificacion = new EventEmitter<any>();

  constructor( private http: HttpClient, 
              public _as: AuthService  ) { }

  // =================================================================
  //                          Operaciones
  // =================================================================

  getMascota(id: number){
    let url = URL_PRIVADA + '/mascota/' + id;
    
    return this.http.get( url, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  getMascotaShow(id: number){
    let url = URL_PRIVADA + '/mascota/show/' + id;
    
    return this.http.get( url, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }


  agregarMascota (mascota: IMascotaNueva ) {
    let url = URL_PRIVADA + '/mascota';
    
    return this.http.post( url, mascota, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }
  
  editarMascota ( mascota: IMascota ) {
    let url = URL_PRIVADA + '/mascota/' + mascota.id;
    return this.http.put( url, mascota, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  getMascotasDuenio( id: number){
    let url = URL_PRIVADA + '/mascota/duenio/' + id;

    return this.http.get(url, httpOptions)
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  getMascotasVeterinario( id: number){
    let url = URL_PRIVADA + '/mascota/veterinario/' + id;

    return this.http.get(url, httpOptions)
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  getMascotasSinVeterinario(){
    let url = URL_PRIVADA + '/mascota/sinveterinario';

    return this.http.get(url, httpOptions)
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  agregarMascotaVeterinario( id_mascota: number ){
    let url = URL_PRIVADA + '/usuario/agregar_atendidas/' + id_mascota;

    return this.http.put(url, this._as.userLogged, httpOptions)
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  // eliminar desde un duenio
  eliminarMascotaDuenio( id: number ){
    let url = URL_PRIVADA + '/mascota/' + id + '/duenio/' + this._as.userLogged.id;
    return this.http.delete( url, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  // eliminar desde un veterinario
  eliminarMascotaVeterinario( id: number ){
    let url = URL_PRIVADA + '/mascota/' + id + '/veterinario/' + this._as.userLogged.id;
    return this.http.delete( url, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }
}
