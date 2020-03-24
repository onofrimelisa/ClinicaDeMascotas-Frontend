import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFicha } from '../../interfaces/IFicha';
import { FichaService } from '../../services/fichas/ficha.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  id: number;
  ficha: IFicha;
  cargando: boolean = false;

  constructor( private rutas: ActivatedRoute,
                private _fs: FichaService ) { }

  ngOnInit() {
    this.cargando = true;
    this.rutas.params.subscribe( (params)=> {
      this.id = params.id;
      this.cargarFicha();
    });
    
  }

  cargarFicha(){
    this._fs.getFicha( this.id ).subscribe( (resp: any) => {
      this.ficha = resp.ficha_publica;
      this.cargando = false;      
    });
    
  }

}
