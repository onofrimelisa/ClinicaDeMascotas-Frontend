import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinarios',
  templateUrl: './veterinarios.component.html',
  styleUrls: ['./veterinarios.component.css']
})
export class VeterinariosComponent implements OnInit {
  displayedColumns: string[] = ['foto', 'nombre','email','consultorio', 'activo', 'operaciones'];
  dataSource;
  veterinarios: IUsuario[] = null;
  cargando: boolean = false;
  total: number;

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
        console.log(resp.usuarios);
        this.veterinarios = resp.usuarios;
        this.total = resp.total;
        this.dataSource = new MatTableDataSource(this.veterinarios);
        this.cargando = false;
        
      })
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
}
