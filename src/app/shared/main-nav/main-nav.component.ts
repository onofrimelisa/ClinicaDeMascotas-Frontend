import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/service.index';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  
  titulo: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private title: Title,
              private authService: AuthService) {
    
      this.getDataRoute().subscribe( data => {
        this.titulo = data.titulo;
      });
  }
  


  navegar(path){
    this.router.navigate([path])
  }
  
  logout(){
    this.authService.logout();
  }

  getDataRoute() {
    return this.router.events
                  .pipe(
                    filter( event => event instanceof ActivationEnd ),
                    filter( (event:ActivationEnd) => event.snapshot.firstChild === null ),
                    map( (event:ActivationEnd) => event.snapshot.data )
                  )
  }

}
