import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private authService: AuthService ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    let token = this.authService.userToken;
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(req).pipe(
      catchError( this.manejarError )
    );

  }
 
  manejarError( error: HttpErrorResponse ) {
    console.warn(error);
    return throwError(error);
  }


}
