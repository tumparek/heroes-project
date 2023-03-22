import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
  
})
export class LoginComponent {

  public cargando=false;
 
  miFormulario: FormGroup = this.fb.group({
    
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required,Validators.minLength(6)]]
  })
  
  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private router:Router){

  }

  login(){
    if(this.miFormulario.invalid){
      return;
    }
    
    const { email ,password } = this.miFormulario.value

    this.authService.loginUsuario(email,password)
    .then(credenciales=>{
      console.log(credenciales);
      
      this.router.navigate(['/heroes/listado']);
    })
    .catch(err=>{
     
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    })
   
  }

}
