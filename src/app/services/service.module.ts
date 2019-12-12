import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// INDEX
import { AuthGuard, 
  AuthService, 
  UsuarioService, 
  MascotaService, 
  TokenInterceptorService,
  CargaImagenService 
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
    MascotaService,
    CargaImagenService
  ]
})
export class ServiceModule { }
