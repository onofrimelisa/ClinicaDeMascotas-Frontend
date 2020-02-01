import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'

//Rutas
import { APP_ROUTING } from './app-routing.module';

//Modulos
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';


//Componentes
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';

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
    PagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    APP_ROUTING,
    HomeModule,
    SharedModule,
    ServiceModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
