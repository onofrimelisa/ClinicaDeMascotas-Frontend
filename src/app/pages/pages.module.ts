import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

//Rutas
import { PAGES_ROUTING } from './pages-routing.module';

//Modulos
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTING
  ],
  exports: [
    // PagesComponent,
    DashboardComponent
  ]
})
export class PagesModule { }
