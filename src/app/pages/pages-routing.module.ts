import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const PAGES_ROUTES: Routes = [
    { 
        path: '', 
        component: PagesComponent,
        children: [
            {   
                path: 'dashboard', 
                component: DashboardComponent,
                data: { titulo: 'Dashboard' }
            }    
        ] 
    },
    { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
];
export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
