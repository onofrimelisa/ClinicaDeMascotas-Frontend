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
  cargando: boolean = false;

  constructor( public authService: AuthService ) { }

  ngOnInit() {
    this.cargando = true;
    this.usuario = this.authService.userLogged;
    // Inicializo roles
    this.admin = this.authService.admin;
    this.veterinario = this.authService.veterinario;
    this.duenio = this.authService.duenio;
    this.cargando = false;
  }

}
