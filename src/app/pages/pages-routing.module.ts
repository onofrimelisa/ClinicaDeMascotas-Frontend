import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

const PAGES_ROUTES: Routes = [
    { path: '', component: PagesComponent },
    { path: '**', component: PagesComponent },
];
export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);
