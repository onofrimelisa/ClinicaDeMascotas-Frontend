import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IFoto } from "../../../interfaces/IFoto";
import { IMascotaNueva } from '../../../interfaces/IMascota';
import { IFicha } from '../../../interfaces/IFicha';
import { IUsuario } from '../../../interfaces/IUsuario';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// SweetAlert
import Swal from 'sweetalert2'


// Servicios
import { MascotaService, 
          AuthService, 
          FichaService,
          CargaImagenService, 
          UsuarioService } from '../../../services/service.index';

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
  subscripcion: Subscription = new Subscription();
  
  subiendo: boolean;

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
    'TORTUGA',
    'OTRO'
  ];
  veterinarios: string[] = [
  ];


  constructor( private _formBuilder: FormBuilder,
               private _cargaService: CargaImagenService, 
               private _ms: MascotaService,
               private _as: AuthService, 
               private _fs: FichaService,
               private datePipe: DatePipe, 
               public router: Router, 
               public _us: UsuarioService ) {

    // Cargo los veterinarios para el select
    this._us.getVeterinariosActivos()
      .subscribe( (veterinarios: any)=>{
        this.veterinarios = veterinarios;
        console.log(this.veterinarios);
        
        
      });

    

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
      veterinario: ['' ]
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

    // 1 creo la mascota, 2 creo su ficha publica
    if (this.datosMascota.valid) {
      this.subiendo = true;

      // subir foto y obtener url
      if (this.archivo) {
        this.subscripcion = this._cargaService.url$.subscribe(
          (urlFb: string) => {
            this.crearMascota(urlFb); 
            this.registrarMascota( options );
          }
        )
        this._cargaService.cargarFoto(this.archivo, 'mascotas');
      } else {
        this.crearMascota();
        this.registrarMascota(options);
      }
      
    }
  }


  registrarMascota( options:any ) {
    this._ms.agregarMascota( this.mascota )
            .subscribe( ( mascota: IMascotaNueva ) => {
              this.subscripcion.unsubscribe;
              this.subiendo = false;
              
              this.mascota = mascota['mascota'];

              // una vez que se crea la mascota, recien ahi puedo crear su ficha publica
              this.crear_ficha_publica(options);
              this.registrarFicha();
              
            },(err) => {
              this.subscripcion.unsubscribe;
              this.subiendo = false;

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
        this.ficha = ficha['ficha_publica'];
        console.log(this.ficha);
        
        
        Swal.fire(
          'Mascota y ficha pública registradas',
          'Ya puedes ver los datos de tu nueva mascota en tu perfil. Su ficha se podrá ver en el home de la página.',
          'success'
        ).then(()=> this.router.navigate(['/mascotas']));
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
      
    }
    
  }

  // crear ficha publica
  crear_ficha_publica (options: any){

    // inicializo la ficha para poder ir seteando sus valores
    this.ficha = {  id: null,
                    mascota: this.mascota['id'],
                    nombre: null,
                    especie: null,
                    raza: null,
                    fecha_nacimiento: null,
                    sexo: null,
                    color: null,
                    foto: this.mascota.foto,
                    senias: null,
                    email_duenio: null,
                    nombre_duenio: null,
                    apellido_duenio: null,
                    telefono_duenio: null
                  }
    
    // recorro el arreglo de opciones seleccionadas x el usuario para que sean publicas
    for (let index = 0; index < options.length; index++) {

      let element = options[index].value;
      if (element != 'apellido_duenio' && element != 'nombre_duenio' && element != 'telefono_duenio' && element != 'email_duenio') {
        this.ficha[element] = this.mascota[element];
                 
      }else{
        switch (element) {
          case 'apellido_duenio':
            this.ficha[element] = this.usuario['apellido'];
            break;
          case 'nombre_duenio':
            this.ficha[element] = this.usuario['nombre'];
            break;
          case 'email_duenio':
            this.ficha[element] = this.usuario['email'];
            break;
          case 'telefono_duenio':
            this.ficha[element] = this.usuario['telefono'];
            break;
        }

      }

    }
    
  }


  private crearMascota( url: string = null) {
    this.mascota = {
      id: null,
      nombre: this.datosMascota.value.nombre,
      especie: this.datosMascota.value.especie,
      raza: this.datosMascota.value.raza,
      fecha_nacimiento: this.getFecha(),
      sexo: this.datosMascota.value.sexo,
      color: this.datosMascota.value.color,
      foto: url,
      senias: this.datosMascota.value.senias,
      veterinario: this.datosMascota.value.veterinario, 
      duenio: this.usuario.id
    }
  }

}
