import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IFoto } from "../../../interfaces/IFoto";
import { IMascotaNueva } from '../../../interfaces/IMascota';
import { IFicha } from '../../../interfaces/IFicha';
import { DatePipe } from '@angular/common'

// SweetAlert
import Swal from 'sweetalert2'


// Servicios
import { MascotaService } from '../../../services/service.index';

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.css']
})
export class RegistroMascotaComponent implements OnInit {

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
  datosPublicos: [{
    'nombre_publico': '',
    'fecha_nacimiento_publico': ''; 
    'especie_publico': ''; 
    'raza_publico': ''; 
    'sexo_publico': ''; 
    'color_publico': ''; 
    'senias_publico': '';
    'foto_publico': ''; 
    'nombre_duenio_publico': '';
    'apellido_duenio_publico': '';
    'telefono_duenio_publico': '';

  }];
  
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

  mostrar(options:any){

    for (let index = 0; index < options.length; index++) {
      let element = options[index].value;
      console.log(element);
      
    }
    
  }
}
