import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento/evento.service';
import { IEvento } from 'src/app/interfaces/IEvento';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-listado-eventos',
  templateUrl: './listado-eventos.component.html',
  styleUrls: ['./listado-eventos.component.css']
})
export class ListadoEventosComponent implements OnInit {
  
  maxSizePagination: string = '3';
  paginationConfig: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 3,
    currentPage: 1
  };
  labels: object = {
    previousLabel: 'Back',
    nextLabel: 'Next',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  onPageChange(number: number) {
    this.paginationConfig.currentPage = number;
  }

  cargando: boolean = true;
  eventos: IEvento[] = null;
  hoy = new Date();
  
  modo:string = null;

  constructor( public eventoService: EventoService,
               public authService: AuthService ) { 
           
    if( localStorage.getItem('modo') ) {
      this.modo = localStorage.getItem('modo');
    } else {
      if (this.authService.duenio) {
        this.modo = 'duenio';
      } else if( this.authService.veterinario){
        this.modo = 'veterinario';
      }
      localStorage.setItem('modo', this.modo);      
    }
  }

  ngOnInit() {
    this.eventoService.recuperarPorRol(this.modo, this.authService.userLogged.id);
    this.eventoService.eventos$
      .subscribe( eventos => {
        this.cargando = false;
        this.eventos = eventos;
      })
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
    localStorage.setItem('modo', this.modo);
    this.eventoService.recuperarPorRol(this.modo, this.authService.userLogged.id);
  }

  public toggleRecordatorio( evento: IEvento) {    
    this.eventoService.actualizarRecordarEvento( evento, this.authService.userLogged.id )
      .subscribe( (resp: any) => {
        if (this.modo === 'duenio') {
          if( !resp.evento.recordar_duenio ) {
            this.swalRegistrado(resp.evento);
          } else {
            this.swalEliminado(resp.evento);
          }
        } else if((this.modo === 'veterinario')) {
          if( !resp.evento.recordar_veterinario ) {
            this.swalRegistrado(resp.evento);
          } else {
            this.swalEliminado(resp.evento);
          }      
        }
        this.eventoService.recuperarPorRol(this.modo, this.authService.userLogged.id);
      })
  }
  

  eliminarEvento( evento: IEvento) {
    Swal.fire({
      title: `¿Estás seguro de eliminar el evento de tipo ${ evento.tipo }?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.eventoService.eliminarEvento( evento.id )
          .subscribe( () => {
            Swal.fire(
              'Evento eliminado',
              'Se eliminó el evento correctamente',
              'success'
            );
            this.eventoService.recuperarPorRol(this.modo, this.authService.userLogged.id);
          })
      }
    })
  }

  public calcularDias( fecha: string ) {
    let fechaEvento = new Date(fecha).getTime();
    let hoy = new Date().getTime();

    let diff = fechaEvento - hoy;
    // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días
    return Math.round( diff/(1000*60*60*24) );
  }

  fechaExpirada( fecha: string ) {
    return this.calcularDias( fecha ) < 0;
  }

  getToggleControl( evento: IEvento ): boolean {
    if (this.modo == 'duenio') {
      return evento.recordar_duenio;
    } 
    return evento.recordar_veterinario;
  }

  swalRegistrado( evento: IEvento ) {
    Swal.fire(
      'Recordatorio registrado',
      `Se recordará el evento de tipo ${ evento.tipo } para la mascota ${ evento.nombre_mascota }`,
      'success'
    )
  }

  swalEliminado( evento: IEvento ) {
    Swal.fire(
      'Recordatorio eliminado',
      `No se recordará el evento de tipo ${ evento.tipo } para la mascota ${ evento.nombre_mascota }`,
      'success'
    )
  }

}
