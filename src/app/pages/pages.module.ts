import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes
import { HomeComponent } from './home/home.component';

//Rutas
import { PAGES_ROUTING } from './pages-routing.module';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTING
  ]
})
export class PagesModule { }
