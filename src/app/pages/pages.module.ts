import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Modules
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from "../pipes/pipes.module";
import { NgxPaginationModule } from 'ngx-pagination';

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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';

//Componentes
import { PerfilComponent } from './cuenta/perfil/perfil.component';
import { RegistroMascotaComponent } from './mascotas/registro/registro-mascota.component';
import { EditarComponent } from './cuenta/editar/editar.component';
import { ListadoVeterinarioComponent } from './mascotas/listado-veterinario/listado-veterinario.component';
import { ListadoMascotaComponent } from './mascotas/listado-duenio/listado-mascota.component';
import { ListadoDueniosComponent } from './admin/listado-duenios/listado-duenios.component';
import { MascotaTableComponent } from '../tables/mascota-table/mascota-table.component';
import { ListadoSinVeterinarioComponent } from './mascotas/listado-sin-veterinario/listado-sin-veterinario.component';
import { VeterinariosComponent } from './admin/listado-veterinarios/veterinarios.component';
import { NuevoEventoComponent } from './eventos/nuevo-evento/nuevo-evento.component';
import { ListadoEventosComponent } from './eventos/listado-eventos/listado-eventos.component';
import { EditarMascotaComponent } from './mascotas/editar-mascota/editar-mascota.component';

//Rutas
import { PAGES_ROUTING } from './pages-routing.module';
import { ListadoRecordatoriosComponent } from './eventos/listado-recordatorios/listado-recordatorios.component';
import { EditarEventoComponent } from './eventos/editar-evento/editar-evento.component';
import { ShowMascotaComponent } from './mascotas/show-mascota/show-mascota.component';



@NgModule({
  declarations: [
    PerfilComponent,
    RegistroMascotaComponent,
    EditarComponent, 
    ListadoMascotaComponent, 
    MascotaTableComponent, 
    ListadoVeterinarioComponent, 
    VeterinariosComponent, 
    ListadoDueniosComponent, 
    ListadoSinVeterinarioComponent, 
    NuevoEventoComponent, 
    ListadoEventosComponent, EditarMascotaComponent, ListadoRecordatoriosComponent, EditarEventoComponent, ShowMascotaComponent, 
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
    MatSortModule, 
    SharedModule, 
    PipesModule,
    MatSlideToggleModule,
    MatExpansionModule,
    NgxPaginationModule
  ],
  exports: [
    RegistroMascotaComponent,
  ], 
  providers:[
    MatNativeDateModule
  ]
})
export class PagesModule { }
