import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_PRIVADA, URL_SERVICIOS } from '../../config/config';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IFicha } from '../../interfaces/IFicha';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor( private http: HttpClient ) { }

  // =================================================================
  //                          Operaciones
  // =================================================================

  agregarFicha(ficha: IFicha ) {
    let url = URL_PRIVADA + '/ficha_publica';
    
    return this.http.post( url, ficha, httpOptions )
                .pipe(
                  catchError( err => throwError(err.error))  
                );
  }
}
