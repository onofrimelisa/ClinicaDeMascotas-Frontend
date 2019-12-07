import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../services/service.index';
import { IUsuarioLogin } from '../interfaces/IUsuarioLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  
  @Output() eventoCambiar = new EventEmitter<boolean>();

  form: FormGroup;  
  email:string=''; 
  password:string=''; 
  constructor( private fb: FormBuilder,
               private authService: AuthService ) { 

    this.form = fb.group({  
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', Validators.required] })
    

  }

  login(){
    if (this.form.valid) {
      let usuario: IUsuarioLogin = {
        email: this.form.value.email,
        password: this.form.value.password
      }
      this.authService.login(usuario)
            .subscribe()
    }
  }

  getErrorMessage() {
    return this.form.controls.email.hasError('required') ? 'Debes completar este campo.' :
           this.form.controls.email.hasError('email') ? 'Debes ingrear un email válido.' :
           this.form.controls.password.hasError('required') ? 'Debes completar este campo.' :
              '';
  }


  mostrarRegistro(){
    this.eventoCambiar.emit(true);
  }
  

}
