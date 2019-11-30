import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';

//Rutas
import { PAGES_ROUTING } from './pages-routing.module';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { MascotaComponent } from './mascota/mascota.component';

// material
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatSelectModule, MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';




@NgModule({
  declarations: [
    DashboardComponent,
    PerfilComponent,
    MascotaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTING, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCheckboxModule
  ],
  exports: [
    // PagesComponent,
    DashboardComponent, 
    MascotaComponent
  ], 
  providers:[
    MatNativeDateModule
  ]
})
export class PagesModule { }
