import { Component, OnInit, Input } from '@angular/core';
import { MascotaTableItem } from "../../interfaces/ITablaMascota";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { IMascota } from '../../interfaces/IMascota';
import { MascotaService } from '../../services/mascota/mascota.service';
import Swal from 'sweetalert2';


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

export class MascotaTableComponent implements OnInit {
  
  expandedElement: MascotaTableItem | null;

  // creada x mi, tiene las mascotas y se supone que es la data que va a ir variando
  @Input() realData: IMascota[];
  @Input() modo: String;
  @Input() sinVeterinario: boolean;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'fecha_nacimiento', 'sexo', 'operaciones'];

  constructor( public _ms: MascotaService ){
  }

  ngOnInit() {    

  }

  // eliminar mascota
  eliminarMascota( id: number){
    Swal.fire({
       title: '¿Estas seguro?',
       text: 'Se eliminará la mascota de tu colección',
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, estoy seguro.',
       cancelButtonText: 'Cancelar'
    })
    .then( (result) => {
        if (result.value) {

          if (this.modo == 'duenio') {
            this._ms.eliminarMascotaDuenio( id )
            .subscribe( (resp: any)=> {
              console.log(resp);
              Swal.fire({
                 title: 'Eliminado',
                 text: 'Se eliminó tu mascota.',
                 icon: 'success',
                 confirmButtonText: 'Ok'
              });
              this._ms.notificacion.emit(resp);
              
            })
          }else{
            this._ms.eliminarMascotaVeterinario( id )
            .subscribe( (resp: any)=> {
              console.log(resp);
              Swal.fire({
                 title: 'Eliminado',
                 text: 'Ya no sos el veterinario de esa mascota.',
                 icon: 'success',
                 confirmButtonText: 'Ok'
              });
              this._ms.notificacion.emit(resp);
              
            });

          }
          
        }
    });
    
  }

  agregarAtendidas( id: number ){
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Se agregará a tu colección de mascotas atendidas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro.',
      cancelButtonText: 'Cancelar'
   })
   .then( (result) => {
       if (result.value) {
          this._ms.agregarMascotaVeterinario( id )
            .subscribe( (resp: any) => {
              this._ms.notificacion.emit(resp);
              Swal.fire({
                title: 'Operación realizada con éxito',
                text: 'Ya sos el veterinario de la mascota.',
                icon: 'success',
                confirmButtonText: 'Ok'
             });
            });
       }
    })
  }

  
}
