import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MascotaService } from '../../../services/mascota/mascota.service';
import { IMascotaShow } from '../../../interfaces/IMascota';
import { PaginationInstance } from 'ngx-pagination';
import { IEvento } from 'src/app/interfaces/IEvento';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';
import { EventoService } from '../../../services/evento/evento.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-show-mascota',
  templateUrl: './show-mascota.component.html',
  styleUrls: ['./show-mascota.component.css']
})
export class ShowMascotaComponent implements OnInit {
  
  id: number;
  mascota: IMascotaShow;
  modo: string;

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
  
  

  cargando:boolean = true;

  constructor( private activatedRoute: ActivatedRoute, 
    public mascotaService: MascotaService, 
    public authService: AuthService,
    public eventoService: EventoService) { 
    this.activatedRoute.params.subscribe( (param: Params)=>{
      this.id = param['id'];
    });
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
    this.mascotaService.getMascotaShow(this.id)
        .subscribe( (resp: any) => {
          this.mascota = resp.mascota;
          this.cargando = false;
        });
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

  codigo_qr_url: string = URL_SERVICIOS + '/ficha_publica/' + this.id;
  href : string;
  downloadImage(){
    this.href = document.getElementsByTagName('img')[1].src;
  }

}
