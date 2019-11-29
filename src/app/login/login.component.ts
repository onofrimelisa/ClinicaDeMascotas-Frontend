import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  form: FormGroup;  
  email:string=''; 
  password:string=''; 
  constructor( private fb: FormBuilder ) { 

    this.form = fb.group({  
      'email' : ['', [Validators.required, Validators.email]],
      'password' : ['', Validators.required] })
    

  }

  login(){
    if (this.form.valid) {
      console.log("loggeando");
      console.log(this.form);
    }else{

      console.log("error");
      console.log(this.form);
    }
    
    
  }

  getErrorMessage() {
    return this.form.controls.email.hasError('required') ? 'Debes completar este campo.' :
           this.form.controls.email.hasError('email') ? 'Debes ingrear un email válido.' :
           this.form.controls.password.hasError('required') ? 'Debes completar este campo.' :
              '';
  }

}
