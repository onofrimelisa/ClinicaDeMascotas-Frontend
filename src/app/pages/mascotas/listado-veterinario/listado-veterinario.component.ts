import { Component, OnInit } from '@angular/core';
import { IUsuario } from '../../../interfaces/IUsuario';
import { IMascota } from '../../../interfaces/IMascota';
import { AuthService } from '../../../services/auth/auth.service';
import { MascotaService } from '../../../services/mascota/mascota.service';

@Component({
  selector: 'app-listado-veterinario',
  templateUrl: './listado-veterinario.component.html',
  styleUrls: ['./listado-veterinario.component.css']
})
export class ListadoVeterinarioComponent implements OnInit {

  usuario: IUsuario;
  mascotas: IMascota[];
  cargando:boolean = true;

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
    this._ms.getMascotasVeterinario(this.usuario.id).subscribe(
      (resp) => {
        // si es null, significa que no tiene mascotas
        console.log(resp);
        
        if (resp == null) {
          this.mascotas = null;
        }else{
          this.mascotas = resp['mascotas'];

        }
        this.cargando=false;
        
      }, 
      (err) => console.log(err.error)
      
      
    );
  }

}
