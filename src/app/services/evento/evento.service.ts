import { Injectable, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IEventoNuevo, IEvento } from '../../interfaces/IEvento';
import { URL_SERVICIOS, URL_PRIVADA } from 'src/app/config/config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class EventoService {

  eventos$ = new EventEmitter<IEvento[]>();

  constructor( private http: HttpClient ) { }

  recuperarPorRol( rol:string, id_usuario: number ) {
    let url = `${ URL_PRIVADA }/evento/${ rol }/${ id_usuario }`;
    
    this.http.get(url, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      ).subscribe( (resp: any) => {
        if ( resp == null) {
          this.eventos$.emit( [] );
        } else {
          this.eventos$.emit( resp.eventos )
        }
        
      });
  }
  


  recuperarPorCreador( id_creador: number ) {
    let url = `${ URL_PRIVADA }/evento/listado/${ id_creador }`;
    
    this.http.get(url, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      ).subscribe( (resp: any) => {
        if ( resp == null) {
          this.eventos$.emit( [] );
        } else {
          this.eventos$.emit( resp.eventos )
        }
        
      });
  }
  
  recuperar( id: number ) {
    let url = `${ URL_PRIVADA }/evento/${ id }`;

    return this.http.get(url, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      )
  }


  agregarEvento( evento: IEventoNuevo ) {
    let url = `${ URL_PRIVADA }/evento`;

    return this.http.post(url, evento, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      )
  }
  
  editarEvento( evento: IEvento ) {
    let url = `${ URL_PRIVADA }/evento/${ evento.id }`;

    return this.http.put(url, evento, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      )
  }

  eliminarEvento( id_evento: number ) {
    let url = `${ URL_PRIVADA }/evento/${ id_evento }`;
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      )
  }
  
  actualizarRecordarEvento( evento: IEvento, id_usuario: number ) {
    let url = `${ URL_PRIVADA }/evento/actualizarRecordar/${ id_usuario }/${ evento.id }`;

    return this.http.put(url, evento, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      )
  }


}
