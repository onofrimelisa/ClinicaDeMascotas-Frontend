import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IFoto } from "../../../interfaces/IFoto";
import { IMascotaNueva } from '../../../interfaces/IMascota';
import { IFicha } from '../../../interfaces/IFicha';
import { IUsuario } from '../../../interfaces/IUsuario';
import { DatePipe } from '@angular/common'

// SweetAlert
import Swal from 'sweetalert2'


// Servicios
import { MascotaService } from '../../../services/mascota/mascota.service';
import { AuthService } from '../../../services/auth/auth.service';
import { FichaService } from '../../../services/fichas/ficha.service';

@Component({
  selector: 'app-listado-mascota',
  templateUrl: './registro-mascota.component.html',
  styleUrls: ['./registro-mascota.component.css']
})
export class RegistroMascotaComponent implements OnInit {

  // FORMULARIO PARA AGREGAR MASCOTA
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
    'nombre': '',
    'fecha_nacimiento': ''; 
    'especie': ''; 
    'raza': ''; 
    'sexo': ''; 
    'color': ''; 
    'senias': '';
    'foto': ''; 
    'nombre_duenio': '';
    'apellido_duenio': '';
    'telefono_duenio': '';

  }];

  // VARIABLES
  ficha: IFicha = null;
  mascota: IMascotaNueva;
  usuario: IUsuario = null;
  
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


  constructor( private _formBuilder: FormBuilder, 
               private _ms: MascotaService,
               private _as: AuthService, 
               private _fs: FichaService,
               private datePipe: DatePipe ) {

    // INICIALIZO USUARIO LOGGEADO
    this.usuario = this._as.userLogged;
    
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
  procesarMascota( options:any ){

    // 1 creo la mascota
    
    // subir foto y obtener url
    let url = '';

    this.mascota = {
      id: '',
      nombre: this.datosMascota.value.nombre,
      especie: this.datosMascota.value.especie,
      raza: this.datosMascota.value.raza,
      fecha_nacimiento: this.getFecha(),
      sexo: this.datosMascota.value.sexo,
      color: this.datosMascota.value.color,
      foto: url,
      senias: this.datosMascota.value.senias,
      veterinario: '1', 
      duenio: '1'
    }
    
    this.registrarMascota( options );


    // 2 creo la ficha publica
    // this.crear_ficha_publica(options);
    // console.log(this.ficha);
    
    // this.registrarFicha();
  }


  registrarMascota( options:any ) {
    this._ms.agregarMascota( this.mascota )
            .subscribe( ( mascota: IMascotaNueva ) => {
              this.mascota = mascota['mascota'];
              console.log("mascota");

              this.crear_ficha_publica(options);
              this.registrarFicha();
              
            },(err) => {
              console.log(err);
              
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.error,
              })
            });
  }

  registrarFicha(){
    this._fs.agregarFicha(this.ficha).subscribe(
      (ficha: IFicha) => {
        console.log(ficha);
        
        Swal.fire(
          'Mascota registrada',
          'Ya puedes ver los datos de tu nueva mascota en tu perfil. La ficha pública se podrá ver en el home de la página.',
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

  // crear ficha publica
  crear_ficha_publica (options: any){

    // inicializo la ficha para poder ir seteando sus valores
    this.ficha = {  id: '',
                    mascota: this.mascota['id'],
                    nombre: '',
                    especie: '',
                    raza: '',
                    fecha_nacimiento: '',
                    sexo: '',
                    color: '',
                    foto: '',
                    senias: '',
                    email_duenio: '',
                    nombre_duenio: '',
                    apellido_duenio: '',
                    telefono_duenio: ''
                  }

    console.log(this.ficha['id']);
    

    for (let index = 0; index < options.length; index++) {

      let element = options[index].value;
      if (element != 'apellido_duenio' || element != 'nombre_duenio' || element != 'telefono_duenio') {
        this.ficha[element] = this.mascota[element];
                 
      }

      switch (element) {
        case 'apellido_duenio':
          this.ficha[element] = this.usuario['apellido'];
          break;
        case 'nombre_duenio':
          this.ficha[element] = this.usuario['nombre'];
          break;
        case 'email_duenio':
          this.ficha[element] = this.usuario['telefono'];
          break;
        case 'telefono_duenio':
          this.ficha[element] = this.usuario['email'];
          break;
      }

       
    }
    
  }
}
