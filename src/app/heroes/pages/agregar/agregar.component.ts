import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { HeroesService } from '../../../services/heroes.service';
import { HeroeModel } from '../../../models/heroe.model';





@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent  {

  public heroe:HeroeModel = new HeroeModel();
  public cargando= false;
  

  creadores=[{
    id:'Marvel'
  },
  {
    id:'DC'
  }]

  miFormulario: FormGroup = this.fb.group({
    
    heroe:['', Validators.required],
    nombre:['', Validators.required],
    poder:['', Validators.required],
    creador:['', ],
    vivo:[ true,  ]
 
  })

  constructor( private heroesService:HeroesService,
               private fb:FormBuilder,
               private route:ActivatedRoute,
               private router:Router){
 
  }
  

  guardar(){

    if(this.miFormulario.invalid){
      
      return 
    }
 
    this.heroe=this.miFormulario.value

    this.heroesService.crearHeroe(this.heroe)
    .subscribe(resp=>{
      console.log(resp)
      Swal.fire({
        title:'Héroe creado correctamente',
        timer: 3000,
        icon: 'success',
        showConfirmButton: true,
        
  
      }).then(()=>{
        this.router.navigate(['/heroes/listado' ]);
      })
    })
    
   
  

  }

}


