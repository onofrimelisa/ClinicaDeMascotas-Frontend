import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { EventoService } from '../services/evento/evento.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( public authService: AuthService, 
    public eventoService: EventoService ) { }

  ngOnInit() {
  }

}
