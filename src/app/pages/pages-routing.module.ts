import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MascotaComponent } from './mascota/mascota.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AuthGuard } from '../services/guards/auth.guard';

const PAGES_ROUTES: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
            { path: 'perfil', component: PerfilComponent, data: { titulo: 'Mi Perfil' } },
            { path: 'nueva', component: MascotaComponent, data: { titulo: 'Nueva mascota' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }    
        ] 
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];
export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
