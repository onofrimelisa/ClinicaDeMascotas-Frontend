import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nuevo-evento',
  templateUrl: './nuevo-evento.component.html',
  styleUrls: ['./nuevo-evento.component.css']
})
export class NuevoEventoComponent implements OnInit {

  cargando: boolean = false;

  form: FormGroup;
  descripcion: string;
  diagnostico: string;
  droga: string;
  indicaciones: string;
  fecha: Date;
  observaciones: string;
  peso: string;
  
  tipo: string;
  mascota: string;
  
  constructor( private _formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private datePipe: DatePipe ) { }

  ngOnInit() {
    this.cargando = false;
    this.inicializarForm();
  }

  getFecha() {
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
