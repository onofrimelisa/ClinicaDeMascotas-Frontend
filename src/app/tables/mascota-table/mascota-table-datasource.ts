import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { MascotaTableItem } from "../../interfaces/ITablaMascota";
import { MascotaService } from '../../services/mascota/mascota.service';

const EXAMPLE_DATA: MascotaTableItem[] = [
  {id: 1, nombre: 'Hydrogen', nacimiento: 'fecha', sexo:'sexo', veterinario: 'vet', foto: null},
  {id: 2, nombre: 'Helium', nacimiento: 'fecha', sexo:'sexo', veterinario: 'vet', foto: null},
  {id: 3, nombre: 'Lithium', nacimiento: 'fecha', sexo:'sexo', veterinario: 'vet', foto: null},
  {id: 4, nombre: 'Beryllium', nacimiento: 'fecha', sexo:'sexo', veterinario: 'vet', foto: null},
  {id: 5, nombre: 'Boron', nacimiento: 'fecha', sexo:'sexo', veterinario: 'vet', foto: null},
];


/**
 * Data source for the MascotaTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MascotaTableDataSource extends DataSource<MascotaTableItem> {
  data: MascotaTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  expandedElement: MascotaTableItem | null;

  constructor( ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MascotaTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MascotaTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MascotaTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'nombre': return compare(a.nombre, b.nombre, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


