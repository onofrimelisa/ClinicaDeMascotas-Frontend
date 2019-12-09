import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_PRIVADA, URL_SERVICIOS } from '../../config/config';
import { IMascotaNueva } from '../../interfaces/IMascota';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FichaService {

  constructor() { }
}
