import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { IEvento, IEventoNuevo } from 'src/app/interfaces/IEvento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService, EventoService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.css']
})
export class EditarEventoComponent implements OnInit {

  cargando: boolean = true;
  usuario: IUsuario = null;
  
  evento: IEvento;
  id_evento: number;

  form: FormGroup;
  descripcion: string;
  diagnostico: string;
  droga: string;
  indicaciones: string;
  fecha: Date;
  observaciones: string;
  peso: number;
  
  tipo: string;

  tipos: string[] = [
    'Visitas al veterinario', 
    'Vacunaciones', 
    'Enfermedades',
    'Intervenciones quirúrgicas',
    'Historial reproductivo',
    'Desparacitaciones'
  ]
  

  constructor( private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private eventoService: EventoService,
    private datePipe: DatePipe,
    public router: Router ) { 
      
      this.activatedRoute.params.subscribe( params => this.id_evento = params.id)
    }

  ngOnInit() {
    this.usuario = this.authService.userLogged;
    this.eventoService.recuperar(this.id_evento)
      .subscribe( (resp: any) => {
        this.cargando = false;
        this.evento = resp.evento;
        console.log(this.evento);
        this.inicializarForm();
      })
  }


  procesarEvento() {
    const nuevo_evento: IEvento = {
      id: this.evento.id,
      tipo: this.form.value.tipo,
	    fecha: this.getFecha(),
	    peso: this.form.value.peso,
	    descripcion: this.form.value.descripcion,
	    observaciones: this.form.value.observaciones,
	    diagnostico: this.form.value.diagnostico,
    	droga: this.form.value.droga,
    	indicaciones: this.form.value.indicaciones,
    	usuario_creador: this.usuario.id,
      id_mascota: this.evento.id_mascota,
      nombre_mascota: this.evento.nombre_mascota,
      recordar_duenio: this.evento.recordar_duenio,
	    recordar_veterinario: this.evento.recordar_veterinario
    }
    
    this.editarEvento( nuevo_evento );
  }
    
  private editarEvento( evento: IEvento ) {
    this.eventoService.editarEvento( evento )
      .subscribe( (resp: any) => {
        Swal.fire(
          'Evento modificado',
          `Se guardaron los cambios del evento de tipo ${ resp.evento.tipo } para ${ resp.evento.nombre_mascota }`,
          'success'
        );
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error,
        })
      });
  }


  private getFecha() {
    return this.datePipe.transform(this.form.value.fecha, 'yyyy-MM-dd');
  }
  //===============================================
  //                  FORMULARIOS
  //===============================================
  private inicializarForm() {
    this.form = this._formBuilder.group({
      descripcion: [this.evento.descripcion, Validators.required],
      diagnostico: [this.evento.diagnostico],
      droga: [this.evento.droga],
      indicaciones: [this.evento.indicaciones],
      fecha: [this.evento.fecha, Validators.required],
      observaciones: [this.evento.observaciones],
      peso: [this.evento.peso],
      tipo: [this.evento.tipo, Validators.required]
    });
  }

}
