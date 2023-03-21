import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {


  cargando:boolean=false;

  miFormulario: FormGroup = this.fb.group({

    nombre:['prueba', Validators.required ],
    email:['prueba1@gmail.com', [Validators.required,Validators.email]],
    password:['',[ Validators.required,Validators.minLength(6) ]]

  })


  constructor( private fb:FormBuilder,
               private authService:AuthService,
               private router:Router){

  }

  guardar(){

    if(this.miFormulario.invalid){
      return
    }
  

    const { nombre, email ,password } = this.miFormulario.value

    this.authService.crearusUario(nombre,email,password)
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
