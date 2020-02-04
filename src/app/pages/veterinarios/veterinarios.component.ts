import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IUsuario } from '../../interfaces/IUsuario';
import { UsuarioService } from '../../services/service.index';

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
        this.veterinarios = resp.usuarios;
        this.total = resp.total;
        this.dataSource = new MatTableDataSource(this.veterinarios);
        this.cargando = false;
        
      })
  }
}
