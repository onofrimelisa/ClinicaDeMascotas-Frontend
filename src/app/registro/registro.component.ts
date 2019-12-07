import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { IFoto } from '../interfaces/IFoto'
import { IUsuarioNuevo } from '../interfaces/IUsuario';


// SweetAlert
import Swal from 'sweetalert2'
import { UsuarioService } from '../services/service.index';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  
  @Output() eventoCambiar = new EventEmitter<boolean>();


  datosPersonales: FormGroup;
  email: string;
  password: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  telefono: string;
  rol: string;

  // Foto
  archivo: IFoto = null;
  imagenTemp: string;
  formFoto: FormGroup;
  foto: string;

  // Veterinario
  datosProfesionales: FormGroup;
  nombre_consultorio: string;
  domicilio_consultorio: string;
  matricula: string;
  
  constructor( private _formBuilder: FormBuilder,
               private usuarioService: UsuarioService,
               private datePipe: DatePipe ) { 
    // DatosPersonales STEP 1
    this.datosPersonales = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required],
      
    });
    
    // Foto STEP 2
    this.formFoto = this._formBuilder.group({
      foto: ['']
    });

    // DatosProfesionales STEP 3
    this.datosProfesionales = this._formBuilder.group({
      nombre_consultorio: [''],
      domicilio_consultorio: [''],
      matricula: ['']
    });
  }

  ngOnInit() {
  }
  
  registrarUsuario(usuarioNuevo: IUsuarioNuevo) {
    this.usuarioService.agregarUsuario(usuarioNuevo)
            .subscribe( (usuario) => {
              Swal.fire(
                'Usuario registrado',
                'Iniciá sesión y comenzá a utilizar el sitio',
                'success'
              );
              this.mostrarLogin();
            },(err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.error,
              })
            });
  }
  

  procesarUsuario() {
    var activo:boolean = true;
    if (this.datosPersonales.value.rol == 'veterinario') {
      activo = false;
    }
    
    // subir foto y obtener url
    let url = '';

    const usuarioNuevo: IUsuarioNuevo = {
      email: this.datosPersonales.value.email,
      password: this.datosPersonales.value.password,
      apellido: this.datosPersonales.value.apellido,
      nombre: this.datosPersonales.value.nombre,
      fecha_nacimiento: this.getFecha(),
      telefono: this.datosPersonales.value.telefono,
      activo: activo,
      foto: url,
      rol: this.datosPersonales.value.rol,
      nombre_consultorio: this.datosProfesionales.value.nombre_consultorio,
      domicilio_consultorio: this.datosProfesionales.value.domicilio_consultorio,
      matricula: this.datosProfesionales.value.matricula
    }
    
    this.registrarUsuario(usuarioNuevo);
  }


  mostrarLogin(){
    this.eventoCambiar.emit(false);
  }
  
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

  setFormConfig(){
    if (this.datosPersonales.value.rol == 'veterinario') {
      this.datosProfesionales.controls['nombre_consultorio'].setValidators([Validators.required]);
      this.datosProfesionales.controls['domicilio_consultorio'].setValidators([Validators.required]);
      this.datosProfesionales.controls['matricula'].setValidators([Validators.required]);
      this.datosProfesionales.controls['nombre_consultorio'].enable();
      this.datosProfesionales.controls['domicilio_consultorio'].enable();
      this.datosProfesionales.controls['matricula'].enable();
    }
    else {
      this.datosProfesionales.controls['nombre_consultorio'].clearValidators();
      this.datosProfesionales.controls['domicilio_consultorio'].clearValidators();
      this.datosProfesionales.controls['matricula'].clearValidators();
      this.datosProfesionales.controls['nombre_consultorio'].disable();
      this.datosProfesionales.controls['domicilio_consultorio'].disable();
      this.datosProfesionales.controls['matricula'].disable();
    }
    this.datosProfesionales.controls['matricula'].updateValueAndValidity();
    this.datosProfesionales.controls['nombre_consultorio'].updateValueAndValidity();
    this.datosProfesionales.controls['domicilio_consultorio'].updateValueAndValidity();
  }


  getFecha() {
    return this.datePipe.transform(this.datosPersonales.value.fecha_nacimiento, 'yyyy-MM-dd');
  }
}
