import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';


const APP_ROUTES: Routes = [
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash:true });

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
