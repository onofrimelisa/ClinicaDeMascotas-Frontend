import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, shareReplay, filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { IUsuario } from '../../interfaces/IUsuario';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  
  titulo: string;
  user: IUsuario;
  
  // Roles
  admin: boolean = false;
  duenio: boolean = false;
  veterinario: boolean = false;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
 

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private title: Title,
              public authService: AuthService) {
      this.user = this.authService.userLogged;
    
      this.getDataRoute().subscribe( data => {
        this.titulo = data.titulo;
      });
  }
  
  ngOnInit() {
    // Inicializo roles
    this.admin = this.authService.admin;
    this.veterinario = this.authService.veterinario;
    this.duenio = this.authService.duenio;
  }


  navegar(path){
    this.router.navigate([path])
  }
  
  logout(){
    Swal.fire({
      title: '¿Estás seguro de cerrar la sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Sesión cerrada',
          'La sesión se cerró con éxito',
          'success'
        );
        this.authService.logout();
      }
    })
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
