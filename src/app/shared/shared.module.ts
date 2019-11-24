import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { MainNavComponent } from './main-nav/main-nav.component';


// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    MainNavComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  exports:[
    MainNavComponent
  ]
})
export class SharedModule { }
