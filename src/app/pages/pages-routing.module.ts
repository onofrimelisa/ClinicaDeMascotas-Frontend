import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './home/home.component';

const PAGES_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent },
];
export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
