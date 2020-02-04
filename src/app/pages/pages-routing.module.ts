import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// GUARDS
import { AdminGuard } from "../services/guards/admin.guard";
import { VeterinarioGuard } from "../services/guards/veterinario.guard";
import { DuenioGuard } from "../services/guards/duenio.guard";

//Componentes
import { RegistroMascotaComponent } from './mascotas/registro/registro-mascota.component';
import { PerfilComponent } from './cuenta/perfil/perfil.component';
import { EditarComponent } from './cuenta/editar/editar.component';
import { ListadoMascotaComponent } from './mascotas/listado-duenio/listado-mascota.component';
import { ListadoVeterinarioComponent } from './mascotas/listado-veterinario/listado-veterinario.component';
import { VeterinariosComponent } from "./veterinarios/veterinarios.component";

const PAGES_ROUTES: Routes = [
    { path: 'perfil', component: PerfilComponent, data: { titulo: 'Mi Perfil' } },
    { path: 'editar', component: EditarComponent ,data: { titulo: 'Editar' } },
    { path: 'nueva', component: RegistroMascotaComponent, data: { titulo: 'Nueva mascota' } },

    // rutas del duenio
    { path: 'mascotas', component: ListadoMascotaComponent, canActivate: [ DuenioGuard ], data: { titulo: 'Mis mascotas' } },
    
    // rutas del veterinario
    { path: 'mascotas_atendidas', component: ListadoVeterinarioComponent, canActivate: [ VeterinarioGuard ],data: { titulo: 'Mis mascotas atendidas' } },
    
    // rutas del admin
    { path: 'veterinarios', component: VeterinariosComponent, canActivate: [ AdminGuard ],data: { titulo: 'Veterinarios' } },

    { path: '', redirectTo: '/perfil', pathMatch: 'full' }    
]
export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
