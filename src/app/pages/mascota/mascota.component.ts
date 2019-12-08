import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IFoto } from "../../interfaces/IFoto";
import { IMascotaNueva } from 'src/app/interfaces/IMascota';
import { DatePipe } from '@angular/common'

// SweetAlert
import Swal from 'sweetalert2'


// Servicios
import { MascotaService } from '../../services/service.index';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

  datosMascota: FormGroup;
  nombre:string; 
  fecha_nacimiento:Date; 
  especie:string; 
  raza:string; 
  sexo:string; 
  color:string; 
  senias:string; 
  veterinario:string;
  
 
  // Foto
  archivo: IFoto = null;
  imagenTemp: string;
  formFoto: FormGroup;
  foto: string;
  
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


  constructor(private _formBuilder: FormBuilder, 
              private _ms: MascotaService, 
              private datePipe: DatePipe ) {

    // DATOS PRIVADOS STEP 1
    this.datosMascota = this._formBuilder.group({
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      especie: ['', Validators.required],
      raza: [''],
      sexo: ['', Validators.required],
      color: ['', Validators.required],
      senias: [''],
      veterinario: ['', Validators.required ]
    });

    // FOTO STEP 2
    this.formFoto = this._formBuilder.group({
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

  // CREAR MASCOTA Y FICHA PUBLICA
  procesarMascota(){

    // 1 creo la mascota
    
    // subir foto y obtener url
    let url = '';

    const mascotaNueva: IMascotaNueva = {
      nombre: this.datosMascota.value.nombre,
      especie: this.datosMascota.value.especie,
      raza: this.datosMascota.value.raza,
      fecha_nacimiento: this.getFecha(),
      sexo: this.datosMascota.value.sexo,
      color: this.datosMascota.value.color,
      foto: url,
      senias: this.datosMascota.value.senias,
      veterinario: this.datosMascota.value.veterinario, 
      duenio: '1'
    }
    
    this.registrarMascota( mascotaNueva );


    // 2 creo la ficha publica
  }


  registrarMascota( mascotaNueva: IMascotaNueva ) {
    this._ms.agregarMascota( mascotaNueva )
            .subscribe( ( mascota ) => {
              console.log(mascota);
              
              Swal.fire(
                'Mascota registrada',
                'Ya puedes ver los datos de tu nueva mascota en tu perfil.',
                'success'
              );
            },(err) => {
              console.log(err);
              
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.error,
              })
            });
  }



  // GUARDAR FOTO

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
  
  // LIMPIAR FOTO 

  limpiarFoto(){
    this.archivo = null;
    this.imagenTemp = null;
  }

  // GET FECHA
  getFecha() {
    return this.datePipe.transform(this.datosMascota.value.fecha_nacimiento, 'yyyy-MM-dd');
  }
}
