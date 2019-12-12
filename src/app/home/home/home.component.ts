import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  registrar:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  cambiarFormulario($event) {
    this.registrar = $event;
  }

}
