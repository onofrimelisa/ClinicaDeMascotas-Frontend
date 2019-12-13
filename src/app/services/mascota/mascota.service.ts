import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_PRIVADA } from 'src/app/config/config';
import { IMascotaNueva } from 'src/app/interfaces/IMascota';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  })
};
@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor( private http: HttpClient ) { }

  // =================================================================
  //                          Operaciones
  // =================================================================

  agregarMascota (mascota: IMascotaNueva ) {
    let url = URL_PRIVADA + '/mascota';
    
    return this.http.post( url, mascota, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }

  getMascotasDuenio( id: string){
    let url = URL_PRIVADA + '/mascota/duenio/' + id;

    return this.http.get(url, httpOptions)
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }
}
