import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MascotaService, AuthService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';
import { IMascota } from 'src/app/interfaces/IMascota';
import { IUsuario } from '../../../interfaces/IUsuario';
import { IEventoNuevo } from '../../../interfaces/IEvento';
import { EventoService } from '../../../services/evento/evento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.css']
})
export class NuevoEventoComponent implements OnInit {

  cargando: boolean = true;
  usuario: IUsuario = null;


  form: FormGroup;
  descripcion: string;
  diagnostico: string;
  droga: string;
  indicaciones: string;
  fecha: Date;
  observaciones: string;
  peso: number;
  
  tipo: string;
  mascota: string;

  tipos: string[] = [
    'Visitas al veterinario', 
    'Vacunaciones', 
    'Enfermedades',
    'Intervenciones quirúrgicas',
    'Historial reproductivo',
    'Desparacitaciones'
  ]
  
  mascotas: IMascota[];

  constructor( private _formBuilder: FormBuilder,
    public authService: AuthService,
    private mascotaService: MascotaService,
    private eventoService: EventoService,
    private datePipe: DatePipe ) { }

  ngOnInit() {
    this.usuario = this.authService.userLogged;
    this.cargarMascotas();
    this.inicializarForm();
  }


  procesarEvento() {
    const nuevo_evento: IEventoNuevo = {
      tipo: this.form.value.tipo,
	    fecha: this.getFecha(),
	    peso: this.form.value.peso,
	    descripcion: this.form.value.descripcion,
	    observaciones: this.form.value.observaciones,
	    diagnostico: this.form.value.diagnostico,
    	droga: this.form.value.droga,
    	indicaciones: this.form.value.indicaciones,
    	usuario_creador: this.usuario.id,
    	id_mascota: Number(this.form.value.mascota)
    }
    
    this.registrarEvento( nuevo_evento );
  }

  
  private cargarMascotas(){
    this.mascotaService.getMascotasDuenio(this.usuario.id).subscribe(
      (resp) => {
        // si es null, significa que no tiene mascotas
        if (resp == null) {
          this.mascotas = null;
        }else{
          this.mascotas = resp['mascotas'];
          console.log(this.mascotas);
        }
        this.cargando=false;
        
      }, 
      (err) => console.log(err.error)
      );
    }
    
  private registrarEvento( evento: IEventoNuevo ) {
    this.eventoService.agregarEvento( evento )
      .subscribe( (resp: any) => {
        Swal.fire(
          'Evento registrado',
          `Se registro el evento de tipo ${ resp.evento.tipo } para ${ resp.evento.nombre_mascota }`,
          'success'
        );
        // redireccionar al listado
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
      descripcion: ['', Validators.required],
      diagnostico: [''],
      droga: [''],
      indicaciones: [''],
      fecha: ['', Validators.required],
      observaciones: [''],
      peso: [''],
      tipo: ['', Validators.required],
      mascota: ['', Validators.required]
    });
  }

}
