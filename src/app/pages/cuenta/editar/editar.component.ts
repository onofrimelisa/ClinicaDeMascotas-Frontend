import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFoto } from 'src/app/interfaces/IFoto';
import { UsuarioService, CargaImagenService, AuthService } from 'src/app/services/service.index';
import { DatePipe } from '@angular/common';
import { IUsuario } from '../../../interfaces/IUsuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['../../pages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditarComponent implements OnInit {
  

  usuario: IUsuario = null;

  datosPersonales: FormGroup;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  telefono: string;
  
  // Foto
  archivo: IFoto = null;
  imagenTemp: string;
  
  // Veterinario
  datosProfesionales: FormGroup;
  nombre_consultorio: string;
  domicilio_consultorio: string;
  matricula: string;

  
  constructor(private _formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private authService: AuthService,
              private cargaImagenService: CargaImagenService,
              private datePipe: DatePipe) { 
    
    this.usuario = this.authService.userLogged;
  }
              
  ngOnInit() {
    this.datosPersonales = this._formBuilder.group({
      email: [this.usuario.email, [Validators.required, Validators.email]],
      password: [this.usuario.password],
      nombre: [this.usuario.nombre, Validators.required],
      apellido: [this.usuario.apellido, Validators.required],
      fecha_nacimiento: [this.usuario.fecha_nacimiento, Validators.required],
      telefono: [this.usuario.telefono, Validators.required]
    });

    // DatosProfesionales STEP 3
    this.datosProfesionales = this._formBuilder.group({
      nombre_consultorio: [this.usuario.nombre_consultorio, Validators.required],
      domicilio_consultorio: [this.usuario.domicilio_consultorio, Validators.required],
      matricula: [this.usuario.matricula, Validators.required]
    });
  }

  // FOTO
  onFileSelected(archivo: File) {
    
    if ( archivo.type.indexOf('image') < 0 ) {
      Swal.fire('Sólo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      this.archivo = null;
      return;
    }

    let fullname = archivo['name'] 
    let name = fullname.split('.')[0];
    let ext = fullname.split('.')[1];

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = String(reader.result);
    
    this.archivo = {
      archivo: archivo,
      nombreArchivo: name,
      extension: ext,
      url: ''
    }
    console.log(this.archivo);
  }
  
  limpiarFoto(){
    this.archivo = null;
    this.imagenTemp = null;
  }

}
