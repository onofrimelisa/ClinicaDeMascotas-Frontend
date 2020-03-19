import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { IUsuario } from '../../../interfaces/IUsuario';
import { UsuarioService } from '../../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-duenios',
  templateUrl: './listado-duenios.component.html',
  styleUrls: ['./listado-duenios.component.css']
})
export class ListadoDueniosComponent implements OnInit {
  displayedColumns: string[] = ['foto', 'nombre','email', 'operaciones'];
  dataSource;
  duenios: IUsuario[] = null;
  cargando: boolean = false;
  total: number;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor( public _us: UsuarioService ) { }

  ngOnInit() {
    this.cargarDuenios();
  }

  cargarDuenios(){
    this.cargando = true;
    this._us.getPorRol('duenio')
      .subscribe( (resp: any)=> {
        console.log(resp);
        this.duenios = resp.usuarios;
        this.total = resp.total;
        this.dataSource = new MatTableDataSource(this.duenios);
        this.cargando = false;
        
      })
  }

}
