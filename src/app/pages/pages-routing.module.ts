import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { PagesComponent } from './pages.component';
import { RegistroMascotaComponent } from './mascotas/registro/registro-mascota.component';
import { PerfilComponent } from './cuenta/perfil/perfil.component';
import { AuthGuard } from '../services/guards/auth.guard';

const PAGES_ROUTES: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Mi Perfil' } },
            { path: 'nueva', component: RegistroMascotaComponent, data: { titulo: 'Nueva mascota' } },
            { path: '', redirectTo: '/perfil', pathMatch: 'full' }    
        ] 
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
