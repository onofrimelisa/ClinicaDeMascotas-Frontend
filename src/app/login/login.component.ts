import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: FormControl;
  password: FormControl;

  constructor() { 

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    

  }

  ngOnInit() {
  }

  login(){
    if (this.email.valid && this.password.valid) {
      console.log("loggeando");
      console.log(this.email);
      console.log(this.password);
    }
    
    console.log("error");
    
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Debes completar este campo.' :
           this.email.hasError('email') ? 'Debes ingrear un email válido.' :
           this.password.hasError('required') ? 'Debes completar este campo.' :
              '';
  }

}
