import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFoto } from '../interfaces/IFoto'

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
  
  constructor( private _formBuilder: FormBuilder ) { 
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
  

  registrarUsuario() {
    console.log("Registrar usuario");

  }


  mostrarLogin(){
    this.eventoCambiar.emit(false);
  }
  
  onFileSelected(archivo: File) {
    
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

}
