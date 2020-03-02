import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


// Componentes
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
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

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ServiceModule } from '../services/service.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
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
    MatFileUploadModule,
    SharedModule,
    ServiceModule, 
    PipesModule
  ]
})
export class HomeModule { }
