import { Component } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'

})
export class RegistroComponent {


  public cargando=false;

  miFormulario: FormGroup = this.fb.group({

    nombre  :['', Validators.required ],
    email   :['', [Validators.required,Validators.email]],
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
