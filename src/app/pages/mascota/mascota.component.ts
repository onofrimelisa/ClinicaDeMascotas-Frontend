import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

  datosMascota: FormGroup;
  nombre:string=''; 
  fecha_nacimiento:Date; 
  especie:string=''; 
  raza:string=''; 
  sexo:string=''; 
  color:string=''; 
  senias:string=''; 
  veterinario:string='';
  
  fotoMascota: FormGroup;
  foto:string='';
  
  // Ficha publica
  datosPublicos: FormGroup;
  nombre_publico:boolean; 
  fecha_nacimiento_publico:boolean; 
  especie_publico:boolean; 
  raza_publico:boolean; 
  sexo_publico:boolean; 
  color_publico:boolean; 
  senias_publico:boolean; 
  veterinario_publico:boolean; 
  foto_publico:boolean; 
  nombre_duenio_publico:boolean;
  apellido_duenio_publico:boolean;
  telefono_duenio_publico:boolean;
  
  // Campos select
  sexos: string[] = [
    'MASCULINO',
    'FEMENINO',
    'OTRO'
  ];
  especies: string[] = [
    'PERRO',
    'GATO',
    'HAMSTER',
    'AVE',
    'PEZ',
    'OTRO'
  ];
  veterinarios: string[] = [
    'Veterinario1',
    'Veterinaro2'
  ];


  constructor(private _formBuilder: FormBuilder) {

    // DATOS PRIVADOS STEP 1
    this.datosMascota = this._formBuilder.group({
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      especie: ['', Validators.required],
      raza: [''],
      sexo: ['', Validators.required],
      color: ['', Validators.required],
      senias: [''],
      veterinario: ['']
      // foto: ['', Validators.required]
    });

    // FOTO STEP 2
    this.fotoMascota = this._formBuilder.group({
      foto: ['']
    });

    // DATOS PUBLICOS STEP 3
    this.datosPublicos = this._formBuilder.group({
      nombre_publico: [false], 
      fecha_nacimiento_publico: [false], 
      especie_publico: [false], 
      raza_publico: [false], 
      sexo_publico: [false], 
      color_publico: [false], 
      senias_publico: [false], 
      veterinario_publico: [false], 
      foto_publico: [false], 
      nombre_duenio_publico: [false],
      apellido_duenio_publico: [false],
      telefono_duenio_publico: [false]
    });
  }

  ngOnInit() {
    
  }

  guardarDatosMascota(){
    console.log(this.datosMascota);
  }

  guardarDatosPublicos(){
    console.log(this.datosPublicos);
    
  }
}
