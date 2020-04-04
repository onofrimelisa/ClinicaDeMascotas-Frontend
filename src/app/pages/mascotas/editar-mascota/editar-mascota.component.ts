import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IFoto } from '../../../interfaces/IFoto';
import { IMascotaNueva } from '../../../interfaces/IMascota';
import { IUsuario } from '../../../interfaces/IUsuario';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';


// SweetAlert
import Swal from 'sweetalert2'

// Servicios
import { MascotaService, 
  AuthService, 
  FichaService,
  CargaImagenService, 
  UsuarioService } from '../../../services/service.index';

@Component({
  selector: 'app-editar-mascota',
  templateUrl: './editar-mascota.component.html',
  styleUrls: ['./editar-mascota.component.css']
})
export class EditarMascotaComponent implements OnInit {
  id: number;

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
  subscripcion: Subscription = new Subscription();
  
  subiendo: boolean;
  cargando: boolean;

  // VARIABLES
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
    'TORTUGA',
    'OTRO'
  ];
  veterinarios: string[] = [
  ];


  constructor(private _formBuilder: FormBuilder,
              private _cargaService: CargaImagenService, 
              private _ms: MascotaService,
              private _as: AuthService, 
              private _fs: FichaService,
              private datePipe: DatePipe, 
              public router: Router, 
              public _us: UsuarioService,
              public activatedRoutes: ActivatedRoute) { 

  this.activatedRoutes.params.subscribe( (param: Params)=>{
    this.id = param['id'];
    
  });

  // Cargo los veterinarios para el select
  this._us.getVeterinariosActivos()
  .subscribe( (veterinarios: any)=>{
    this.veterinarios = veterinarios;
    
    
  });


  this.cargarMascota();

  // INICIALIZO USUARIO LOGGEADO
  this.usuario = this._as.userLogged;
  
  
  // FOTO STEP 2
  this.formFoto = this._formBuilder.group({
    foto: ['']
  });
}

  ngOnInit() {
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
    
  }

  // GET FECHA
  getFecha() {
    return this.datePipe.transform(this.datosMascota.value.fecha_nacimiento, 'yyyy-MM-dd');
  }

  guardarCambios(){

  }

  cargarMascota(){
    this.cargando = true;
    this._ms.getMascota( this.id )
      .subscribe( (resp: any)=>{
        if (resp) {
          this.mascota = resp.mascota;
          // DATOS PRIVADOS STEP 1
          this.datosMascota = this._formBuilder.group({
            nombre: [this.mascota.nombre, Validators.required],
            fecha_nacimiento: [this.mascota.fecha_nacimiento, Validators.required],
            especie: [this.mascota.especie, Validators.required],
            raza: [this.mascota.raza],
            sexo: [this.mascota.sexo, Validators.required],
            color: [this.mascota.color, Validators.required],
            senias: [this.mascota.senias],
            veterinario: [this.mascota.veterinario ]
          });
          this.imagenTemp = this.mascota.foto;
          this.cargando = false;
        }
      }
      )
  }

}
