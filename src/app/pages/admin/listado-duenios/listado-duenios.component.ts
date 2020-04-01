import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IUsuario } from '../../../interfaces/IUsuario';
import { UsuarioService } from '../../../services/service.index';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listado-duenios',
  templateUrl: './listado-duenios.component.html',
  styleUrls: ['./listado-duenios.component.css']
})
export class ListadoDueniosComponent implements OnInit {
  displayedColumns: string[] = ['foto', 'nombre','email', 'roles', 'operaciones'];
  dataSource;
  duenios: IUsuario[] = null;
  cargando: boolean = false;
  total: number;

  // variables para agregar rol
  vet: boolean;
  mostrar_vet: boolean;
  usuario: any;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor( public _us: UsuarioService,
                  public dialog: MatDialog) { }

  ngOnInit() {
    this.cargarDuenios();
  }

  cargarDuenios(){
    this.cargando = true;
    this._us.getPorRol('duenio')
      .subscribe( (resp: any)=> {
        if (resp) {
          
          this.duenios = resp.usuarios;
          this.total = resp.total;
          
          this.dataSource = new MatTableDataSource(this.duenios);
        }
        this.cargando = false;
        
      })
  }

  // Eliminar veterinarios
  eliminarDuenio( usuario: IUsuario ){
    Swal.fire({
       title: '¿Estas seguro?',
       text: 'Se eliminará al usuario: ' + usuario.nombre + ' ' + usuario.apellido,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, estoy seguro.',
       cancelButtonText: 'Cancelar'
    })
    .then( (result) => {
       if (result.value) {
           this._us.eliminarPorRol('duenio', usuario.id)
             .subscribe( (resp) => {
               Swal.fire({
                  title: 'Operacion exitosa',
                  text: 'Se eliminó el usuario.',
                  icon: 'success',
                  confirmButtonText: 'Ok'
               });
               this.cargarDuenios();
             })
       }
    });
  }

  agregarRol( usuario: any ){
    this.usuario = {...usuario}
    this.mostrar_vet = true;
   
    
  }

  agregarRoles(){
    this._us.agreagrRol('veterinario', this.usuario)
      .subscribe( (resp)=>{
        this.cargarDuenios();
        Swal.fire({
           title: 'Operación realizada con éxito',
           text: 'Se le agregó el rol VETERINARIO al usuario ' + this.usuario.nombre + " " + this.usuario.apellido,
           icon: 'success',
           confirmButtonText: 'Ok'
        })
      },
        (err)=>{
          console.log(err);
            Swal.fire({
               title: 'Error al realizar la operación',
               text: 'No se pudo agregar el rol VETERINARIO al usuario ' + this.usuario.nombre + " " + this.usuario.apellido,
               icon: 'error',
               confirmButtonText: 'Ok'
            })
        });

  }

  reset(){
    this.vet = false;
    this.mostrar_vet = false;
  }

}
