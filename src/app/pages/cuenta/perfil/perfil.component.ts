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

  constructor( private authService: AuthService ) { }

  ngOnInit() {
    this.usuario = this.authService.userLogged;
    console.log(this.usuario);
  }

}
