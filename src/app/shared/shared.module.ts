import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes
import { MainNavComponent } from './main-nav/main-nav.component';


// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './pageNotFound/page-not-found.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { LoadingImgComponent } from './loading-img/loading-img.component';

@NgModule({
  declarations: [
    MainNavComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoadingComponent,
    LoadingImgComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    LayoutModule,
    MatButtonModule,
    MatBadgeModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    RouterModule
  ],
  exports:[
    MainNavComponent, 
    FooterComponent, 
    LoadingComponent, 
    LoadingImgComponent
  ]
})
export class SharedModule { }
