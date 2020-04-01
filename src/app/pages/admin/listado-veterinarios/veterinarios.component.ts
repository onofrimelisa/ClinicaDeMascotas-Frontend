import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IUsuario } from '../../../interfaces/IUsuario';
import { UsuarioService } from '../../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.component.html',
  styleUrls: ['./veterinarios.component.css']
})
export class VeterinariosComponent implements OnInit {
  displayedColumns: string[] = ['foto', 'nombre','email','consultorio', 'activo', 'roles', 'operaciones'];
  dataSource;
  veterinarios: IUsuario[] = null;
  cargando: boolean = false;
  total: number;

  // variables para agregar rol
  duenio: boolean;
  mostrar_duenio: boolean;
  usuario: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor( public _us: UsuarioService ) { }

  ngOnInit() {
    this.cargarVeterinarios();
  }

  cargarVeterinarios(){
    this.cargando = true;
    this._us.getPorRol('veterinario')
      .subscribe( (resp: any)=> {
        if (resp) {
          
          this.veterinarios = resp.usuarios;
          this.total = resp.total;
          this.dataSource = new MatTableDataSource(this.veterinarios);
        }        
        this.cargando = false;
        
      })
  }

  // Activar veterinario
  activarVeterinario( usuario: IUsuario ){
    Swal.fire({
       title: '¿Estas seguro?',
       text: 'Cambiarás el estado del veterinario: ' + usuario.apellido + ' ' + usuario.nombre,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, cambiar estado.',
       cancelButtonText: 'Cancelar'
    })
    .then( (result) => {
       if (result.value) {
          this._us.actualizarEstado( usuario )
            .subscribe( ()  => {
              Swal.fire({
                title: 'Operacion exitosa',
                text: 'Se cambio el estado del veterinario.',
                icon: 'success',
                confirmButtonText: 'Ok'
             });
            });

       }
    });
  }

  // Eliminar veterinarios
  eliminarVeterianrio( usuario: IUsuario ){
    Swal.fire({
       title: '¿Estas seguro?',
       text: 'Se eliminará al veterinario: ' + usuario.nombre + ' ' + usuario.apellido,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, estoy seguro.',
       cancelButtonText: 'Cancelar'
    })
    .then( (result) => {
       if (result.value) {
           this._us.eliminarPorRol('veterinario', usuario.id)
             .subscribe( (resp) => {
               Swal.fire({
                  title: 'Operacion exitosa',
                  text: 'Se eliminó el veterinario.',
                  icon: 'success',
                  confirmButtonText: 'Ok'
               });
               this.cargarVeterinarios();
             })
       }
    });
  }

  agregarRol( usuario: any ){
    this.usuario = {...usuario}
    this.mostrar_duenio = true;
   
    
  }

  agregarRoles(){
    this._us.agreagrRol('duenio', this.usuario)
      .subscribe( (resp)=>{
        this.cargarVeterinarios();
        Swal.fire({
           title: 'Operación realizada con éxito',
           text: 'Se le agregó el rol DUEÑO al usuario ' + this.usuario.nombre + " " + this.usuario.apellido,
           icon: 'success',
           confirmButtonText: 'Ok'
        })
      },
        (err)=>{
          console.log(err);
            Swal.fire({
               title: 'Error al realizar la operación',
               text: 'No se pudo agregar el rol DUEÑO al usuario ' + this.usuario.nombre + " " + this.usuario.apellido,
               icon: 'error',
               confirmButtonText: 'Ok'
            })
        });

  }

  reset(){
    this.duenio = false;
    this.mostrar_duenio = false;
  }

}
