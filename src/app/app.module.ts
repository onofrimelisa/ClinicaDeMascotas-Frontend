import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from '@angular/common'

//Rutas
import { APP_ROUTING } from './app-routing.module';

//Modulos
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/service.module';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { RegistroComponent } from './registro/registro.component';

// Angular Material
import { MatFormFieldModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import { MatFileUploadModule } from 'angular-material-fileupload';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PagesComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    PagesModule,
    SharedModule,
    ServiceModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatGridListModule, 
    MatIconModule, 
    MatButtonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatStepperModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFileUploadModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
