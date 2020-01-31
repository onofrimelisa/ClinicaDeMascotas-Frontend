import { AfterViewInit, Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { MascotaTableDataSource} from './mascota-table-datasource';
import { MascotaTableItem } from "../../interfaces/ITablaMascota";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { IMascota } from '../../interfaces/IMascota';

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
  displayedColumns = ['id', 'nombre', 'fecha_nacimiento', 'sexo'];

  constructor(){
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
}
