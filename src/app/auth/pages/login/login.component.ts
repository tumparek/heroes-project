import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  cargando:boolean=false;
 
  miFormulario: FormGroup = this.fb.group({
    
    email:['prueba2@gmail.com', [Validators.required, Validators.email]],
    password:['123456', Validators.required]
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
