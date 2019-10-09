import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes
import { HomeComponent } from './home/home.component';

//Rutas
import { PAGES_ROUTING } from './pages-routing.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTING
  ]
})
export class PagesModule { }
