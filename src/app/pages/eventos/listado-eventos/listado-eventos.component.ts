import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento/evento.service';
import { IEvento } from 'src/app/interfaces/IEvento';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listado-eventos',
  templateUrl: './listado-eventos.component.html',
  styleUrls: ['./listado-eventos.component.css']
})
export class ListadoEventosComponent implements OnInit {

  cargando: boolean = true;
  eventos: IEvento[] = null;

  recordar: boolean[];

  constructor( public eventoService: EventoService,
               private datePipe: DatePipe ) { }

  ngOnInit() {
    this.eventoService.recuperarPorCreador(2)
        .subscribe( (resp:any) => {
          this.cargando = false;
          if (resp) {
            console.log(resp.eventos);
            this.eventos = resp.eventos;
          }
        });
  }



  public getFecha( fecha: Date ) {
    return this.datePipe.transform(fecha, 'dd-MM-yyyy');
  }

}
