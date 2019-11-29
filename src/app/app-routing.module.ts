import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { HomeComponent } from './home/home.component';


const APP_ROUTES: Routes = [
    { path: 'pages', component: PagesComponent },
    { path: 'home', component: HomeComponent }, 
    { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
    // { path: '**', component: PageNotFoundComponent }
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
