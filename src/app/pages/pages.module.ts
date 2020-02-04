import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Componentes
import { PerfilComponent } from './cuenta/perfil/perfil.component';
import { RegistroMascotaComponent } from './mascotas/registro/registro-mascota.component';
import { EditarComponent } from './cuenta/editar/editar.component';
import { ListadoVeterinarioComponent } from './mascotas/listado-veterinario/listado-veterinario.component';
import { ListadoMascotaComponent } from './mascotas/listado/listado-mascota.component';

//Rutas
import { PAGES_ROUTING } from './pages-routing.module';

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
import { MatTabsModule } from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import { MascotaTableComponent } from '../tables/mascota-table/mascota-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { VeterinariosComponent } from './veterinarios/veterinarios.component';



@NgModule({
  declarations: [
    PerfilComponent,
    RegistroMascotaComponent,
    EditarComponent, 
    ListadoMascotaComponent, 
    MascotaTableComponent, 
    ListadoVeterinarioComponent, VeterinariosComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTING, 
    MatStepperModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatTabsModule, 
    MatCheckboxModule, 
    MatGridListModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    MatButtonModule, 
    LayoutModule,
    MatListModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule
  ],
  exports: [
    RegistroMascotaComponent
  ], 
  providers:[
    MatNativeDateModule
  ]
})
export class PagesModule { }
