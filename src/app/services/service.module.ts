import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Guards
import { AuthGuard, 
  AuthService, 
  UsuarioService, 
  MascotaService, 
  TokenInterceptorService 
} from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthGuard,
    AuthService,
    UsuarioService, 
    MascotaService
  ]
})
export class ServiceModule { }
