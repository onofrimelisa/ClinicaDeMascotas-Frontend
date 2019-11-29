import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Rutas
import { APP_ROUTING } from './app-routing.module';

//Modulos
import { PagesModule } from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

// Angular Material
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    PagesModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatGridListModule, 
    MatIconModule, 
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
