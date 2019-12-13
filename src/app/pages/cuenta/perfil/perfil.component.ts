import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { IUsuario } from '../../../interfaces/IUsuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['../../pages.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: IUsuario = null;
  // Roles
  admin: boolean = false;
  duenio: boolean = false;
  veterinario: boolean = false;

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.usuario = this.authService.userLogged;
    console.log(this.usuario);

     // Inicializo roles
     let roles = this.authService.userLogged.roles;
     if ( roles.indexOf('admin') > -1 ) {
       this.admin = true;
     }
     if ( roles.indexOf('duenio') > -1 ) {
       this.duenio = true;
     }
     if ( roles.indexOf('veterinario') > -1 ) {
       this.veterinario = true;
     }
  }

}
