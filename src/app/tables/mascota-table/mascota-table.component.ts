import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MascotaTableDataSource} from './mascota-table-datasource';
import { MascotaTableItem } from "../../interfaces/ITablaMascota";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { IMascota } from '../../interfaces/IMascota';
import { MascotaService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ListadoMascotaComponent } from '../../pages/mascotas/listado-duenio/listado-mascota.component';
import { ListadoVeterinarioComponent } from '../../pages/mascotas/listado-veterinario/listado-veterinario.component';

@Component({
  selector: 'app-mascota-table',
  templateUrl: './mascota-table.component.html',
  styleUrls: ['./mascota-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class MascotaTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<MascotaTableItem>;
  dataSource: MascotaTableDataSource;
  expandedElement: MascotaTableItem | null;

  // creada x mi, tiene las mascotas y se supone que es la data que va a ir variando
  @Input() realData: IMascota[];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nombre', 'fecha_nacimiento', 'sexo', 'operaciones'];

  constructor( public _ms: MascotaService, 
                public router: Router, 
                public listadoMascotas: ListadoMascotaComponent, 
                public listadoVeterinario: ListadoVeterinarioComponent ){
  }

  ngOnInit() {
    this.dataSource = new MascotaTableDataSource( this.realData );
    
    
    

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.expandedElement = this.dataSource.expandedElement;

    
  }

  // eliminar mascota
  eliminarMascota( id: number){
    Swal.fire({
       title: '¿Estas seguro?',
       text: 'Se eliminará tu mascota con id ' + id,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, estoy seguro.',
       cancelButtonText: 'Cancelar'
    })
    .then( (result) => {
        if (result.value) {
          this._ms.eliminarMascota( id )
            .subscribe( (resp: any)=> {
              console.log(resp);
              Swal.fire({
                 title: 'Eliminado',
                 text: 'Se eliminó tu mascota',
                 icon: 'success',
                 confirmButtonText: 'Ok'
              });
              // para que actualice el listado de mascotas
              // this.listadoMascotas.ngOnInit();
              this._ms.notificacion.emit();
              return this.router.navigate(['/mascotas']);
              
            })
        }
    });
    
  }
}
