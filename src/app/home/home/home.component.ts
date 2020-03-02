import { Component, OnInit } from '@angular/core';
import { IFicha } from '../../interfaces/IFicha';
import { FichaService } from '../../services/service.index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  registrar:boolean = false;
  fichas: IFicha [] = [];
  fichas_home: IFicha [] = [];
  total: number;

  constructor( public _fs: FichaService ) { }

  ngOnInit() {
    this.cargarFichas();
  }

  cambiarFormulario($event) {
    this.registrar = $event;
  }

  cargarFichas(){
    this._fs.recuperarTodas().subscribe(
      (resp: any)=>{
        this.fichas = resp.fichas_publicas;
        this.total = resp.total;

        this.fichas_home.push(this.fichas[0]);
        this.fichas_home.push(this.fichas[1]);
        console.log(this.fichas_home);
        
        
        
      }
    )
  }

}
