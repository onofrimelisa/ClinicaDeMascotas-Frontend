import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { EventoService } from '../../../services/evento/evento.service';
import { IEvento } from 'src/app/interfaces/IEvento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-recordatorios',
  templateUrl: './listado-recordatorios.component.html',
  styleUrls: ['./listado-recordatorios.component.css']
})
export class ListadoRecordatoriosComponent implements OnInit {

  eventos: IEvento[] = [];
  cargando: boolean = true;
  
  modo:string = null;

  constructor( public authService: AuthService, 
               public eventoService: EventoService ) { 
                if (this.authService.duenio) {
                  this.modo = 'duenio';
                } else if( this.authService.veterinario){
                  this.modo = 'veterinario';
                }  
               }

  ngOnInit() {
    this.eventoService.recuperarPorRol(this.modo, this.authService.userLogged.id);
    this.eventoService.eventos$
      .subscribe( (eventos: IEvento[]) => {
        if( this.modo == 'duenio') {
          this.eventos = eventos.filter( e => (e.recordar_duenio && !this.fechaExpirada(e.fecha)));
        } else if(this.modo == 'veterinario') {
          this.eventos = eventos.filter( e => (e.recordar_veterinario && !this.fechaExpirada(e.fecha)));          
        }
        // this.procesarEventos();
        this.cargando = false;
      });
  }


  cambiarModo() {
    switch (this.modo) {
      case 'duenio':
        this.modo = 'veterinario';
        break;
    
      case 'veterinario':
        this.modo = 'duenio';
        break;
    }
    this.eventoService.recuperarPorRol(this.modo, this.authService.userLogged.id);
  }
  
  public eliminar( evento: IEvento) {    
    this.eventoService.actualizarRecordarEvento( evento, this.authService.userLogged.id )
      .subscribe( () => this.eventoService.recuperarPorRol( this.modo, this.authService.userLogged.id ))
  }

  
  public getMensajeDias( fecha: string ) {
    let dias = this.calcularDias(fecha);
    if ( dias == 0 || dias == 1) {
      return "¡Faltan pocas horas!"
    }
    return `Faltan ${ dias } días`;
  }

  public calcularDias( fecha: string ) {
    let fechaEvento = new Date(fecha).getTime();
    let hoy = new Date().getTime();

    let diff = fechaEvento - hoy;
    
    // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
    return Math.ceil( diff/(1000*60*60*24) );
  }

  fechaExpirada( fecha: string ) {
    return this.calcularDias( fecha ) < 0 
  }

  procesarEventos() {
    let dias; 
    
    for (let e of this.eventos) {
      dias = this.calcularDias( e.fecha );
      if (dias == 0){
        this.eventos = this.eventos.filter( ev => ev.id != e.id );
        this.eventos.unshift( e );
      }
    }
  }


}
