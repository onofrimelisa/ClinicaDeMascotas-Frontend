import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Guards
import { AuthGuard, AuthService } from './service.index';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class ServiceModule { }
