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
import { VeterinariosComponent } from "./admin/listado-veterinarios/veterinarios.component";
import { ListadoDueniosComponent } from "./admin/listado-duenios/listado-duenios.component";
import { NuevoEventoComponent } from './eventos/nuevo-evento/nuevo-evento.component';
import { ListadoSinVeterinarioComponent } from './mascotas/listado-sin-veterinario/listado-sin-veterinario.component';
import { ListadoEventosComponent } from './eventos/listado-eventos/listado-eventos.component';

const PAGES_ROUTES: Routes = [
    { path: 'perfil', component: PerfilComponent, data: { titulo: 'Mi Perfil' } },
    { path: 'editar', component: EditarComponent ,data: { titulo: 'Editar' } },
    { path: 'nueva', component: RegistroMascotaComponent, data: { titulo: 'Nueva mascota' } },

    // rutas del duenio
    { path: 'mascotas', component: ListadoMascotaComponent, canActivate: [ DuenioGuard ], data: { titulo: 'Mis mascotas' } },
    
    // rutas del veterinario
    { path: 'mascotas_atendidas', component: ListadoVeterinarioComponent, canActivate: [ VeterinarioGuard ],data: { titulo: 'Mis mascotas atendidas' } },
    { path: 'mascotas_sin_vet', component: ListadoSinVeterinarioComponent, canActivate: [ VeterinarioGuard ],data: { titulo: 'Mascotas sin veterinario' } },
    
    // rutas del admin
    { path: 'veterinarios', component: VeterinariosComponent, canActivate: [ AdminGuard ],data: { titulo: 'Veterinarios' } },
    { path: 'duenios', component: ListadoDueniosComponent, canActivate: [ AdminGuard ],data: { titulo: 'Dueños' } },
    
    // eventos
    { path: 'nuevo-evento', component: NuevoEventoComponent, data: { titulo: 'Nuevo Evento' } },
    { path: 'listado-eventos', component: ListadoEventosComponent, data: { titulo: 'Listado de Eventos' } },
    { path: '', redirectTo: '/perfil', pathMatch: 'full' }    
]
export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
