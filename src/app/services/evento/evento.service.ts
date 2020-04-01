import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IEventoNuevo } from '../../interfaces/IEvento';
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

  constructor( private http: HttpClient ) { }

  
  agregarEvento( evento: IEventoNuevo ) {
    let url = `${ URL_PRIVADA }/evento`;

    return this.http.post(url, evento, httpOptions)
      .pipe(
        catchError( err => throwError(err.error))
      )
  }

}
