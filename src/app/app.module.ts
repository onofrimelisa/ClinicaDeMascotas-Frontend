import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'

//Rutas
import { APP_ROUTING } from './app-routing.module';

//Modulos
import { HomeModule } from './home/home.module';
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

//Componentes
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { MascotaTableComponent } from './tables/mascota-table/mascota-table.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import * as firebase from 'firebase';


// Environments
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebase);


@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    MascotaTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    APP_ROUTING,
    HomeModule,
    PagesModule,
    SharedModule,
    ServiceModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
