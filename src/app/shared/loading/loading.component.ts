import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [`
    mat-icon{
      font-size: 40px;
    }
    `
  ]
})
export class LoadingComponent implements OnInit {

  @Input() mensaje: string = 'Cargando...'

  constructor() { }

  ngOnInit() {
  }

}
