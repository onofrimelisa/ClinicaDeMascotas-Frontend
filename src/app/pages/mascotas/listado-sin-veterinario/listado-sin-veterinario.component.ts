import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../../interfaces/IUsuario';
import { IMascota } from '../../../interfaces/IMascota';
import { AuthService, MascotaService } from '../../../services/service.index';

@Component({
  selector: 'app-listado-sin-veterinario',
  templateUrl: './listado-sin-veterinario.component.html',
  styleUrls: ['./listado-sin-veterinario.component.css']
})
export class ListadoSinVeterinarioComponent implements OnInit {

  usuario: IUsuario;
  mascotas: IMascota[];
  cargando:boolean = true;
  total: number;

  constructor( private _as: AuthService, 
    public _ms: MascotaService ) { 
      this.usuario = this._as.userLogged;

    this._ms.notificacion.subscribe( ()=> {
      this.cargarMascotas();
    });
    }

  ngOnInit() {
    this.cargarMascotas();
  }

  cargarMascotas(){
    this._ms.getMascotasSinVeterinario()
      .subscribe( (resp: any) => {
        if (resp) {
          this.total = resp.total;
          this.mascotas = resp.mascotas;
        }
        this.cargando = false;
      })
  }

}
