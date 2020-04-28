import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { EventoService } from '../services/evento/evento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor( public authService: AuthService, private router: Router, 
    public eventoService: EventoService ) { 
      if (this.authService.admin) {
        this.router.navigate(['veterinarios']);
      }
    }

  ngOnInit() {
  }

}
