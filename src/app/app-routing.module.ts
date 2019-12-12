import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './services/guards/auth.guard';


const APP_ROUTES: Routes = [
    
    { path: 'home', component: HomeComponent },    
    { path: '**', redirectTo: '/home', pathMatch: 'full' }
    // { path: '**', component: PageNotFoundComponent }
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });

