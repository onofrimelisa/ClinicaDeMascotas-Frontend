import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Componentes
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { MascotaComponent } from './mascota/mascota.component';

//Rutas
import { PAGES_ROUTING } from './pages-routing.module';

//Modulos
import { SharedModule } from '../shared/shared.module';

// material
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatSelectModule, MatCheckboxModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';




@NgModule({
  declarations: [
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
    MatCheckboxModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, LayoutModule
  ],
  exports: [
    // PagesComponent,
    MascotaComponent
  ], 
  providers:[
    MatNativeDateModule
  ]
})
export class PagesModule { }
