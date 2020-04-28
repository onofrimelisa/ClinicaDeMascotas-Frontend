import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IFoto } from '../../../interfaces/IFoto';
import { IMascotaNueva, IMascota } from '../../../interfaces/IMascota';
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
  tiene_vet: boolean = false;
  veterinario_actual: IUsuario = null;
  cambiarVetControl: boolean = false;
  // FORMULARIO PARA AGREGAR MASCOTA
  datosMascota: FormGroup;
  nombre:string; 
  fecha_nacimiento:Date; 
  especie:string; 
  raza:string; 
  sexo:string; 
  color:string; 
  senias:string; 
  
  // VETERINARIO
  formVeterinario: FormGroup;
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
  mascota: IMascota;
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
  veterinarios: IUsuario[] = [
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

  actualizarFoto(){
    this.subiendo = true;
    this.subscripcion = this._cargaService.url$
      .subscribe( (url: string) => {
        this.subiendo = false;
        // Actualizar mascota
        this.mascota.foto = url;
        this.procesarMascota();
      });
    this._cargaService.cargarFoto( this.archivo, 'mascotas' );
  }

  limpiarFoto(){
    this.archivo = null;
    this.imagenTemp = null;
  }


  procesarMascota() {
    const mascotaActualizada: IMascota = {
      id: this.mascota.id,
      nombre: this.datosMascota.value.nombre,
      especie: this.datosMascota.value.especie,
      raza: this.datosMascota.value.raza,
      fecha_nacimiento: this.getFecha(),
      sexo: this.datosMascota.value.sexo,
      color: this.datosMascota.value.color,
      foto: this.mascota.foto,
      senias: this.datosMascota.value.senias,
      veterinario: this.datosMascota.value.veterinario,
      duenio: this.mascota.duenio,
      ficha_publica: this.mascota.ficha_publica
    }
    console.log(mascotaActualizada);
    this.actualizarMascota(mascotaActualizada);
  }

  actualizarMascota(mascotaActualizada: IMascota) {
    this._ms.editarMascota(mascotaActualizada)
            .subscribe( (res:any) => {
              this.subiendo = false;
              this.subscripcion.unsubscribe();
              Swal.fire(
                'Operación exitosa',
                'Datos actualizados correctamente',
                'success'
                );
              console.log(res);
              this.mascota = res.mascota;
              this.veterinario_actual = this.veterinarios.find( v => v.id == this.mascota.veterinario);
              this.cambiarVetControl = false;
              if(!this.veterinario_actual) 
                this.cambiarVetControl = true;
            },(err) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.error,
              })
            });
  }

  cargarMascota(){
    this.cargando = true;
    this._ms.getMascota( this.id )
      .subscribe( (resp: any)=>{
        if (resp) {
          this.mascota = resp.mascota;
          this.mascota.duenio = this._as.userLogged.id;
          // DATOS PRIVADOS STEP 1
          this.veterinario_actual = this.veterinarios.find( v => v.id == this.mascota.veterinario);
          
          let valor_vet;
          if(!this.veterinario_actual) {
            this.cambiarVetControl = true;
            valor_vet = 0;
          } else {
            valor_vet = this.veterinario_actual.id;
          }
        
          this.datosMascota = this._formBuilder.group({
            nombre: [this.mascota.nombre, Validators.required],
            fecha_nacimiento: [this.mascota.fecha_nacimiento, Validators.required],
            especie: [this.mascota.especie, Validators.required],
            raza: [this.mascota.raza],
            sexo: [this.mascota.sexo, Validators.required],
            color: [this.mascota.color, Validators.required],
            senias: [this.mascota.senias],
            veterinario: [valor_vet],
          });
          this.imagenTemp = this.mascota.foto;
          this.cargando = false;
        }
      }
      )
  }


}
