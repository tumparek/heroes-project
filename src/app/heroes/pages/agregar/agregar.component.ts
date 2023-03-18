import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../../services/heroes.service';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from '../../../models/heroe.model';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  heroe:HeroeModel=new HeroeModel();
  cargando= false;

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
    creador:['DC', Validators.required],
    vivo:[false  ,  ]
 
  })

  constructor( private heroesService:HeroesService,
               private fb:FormBuilder,
               private route:ActivatedRoute){
 
  }
  ngOnInit(): void {
    
    console.log(this.miFormulario.value)
    console.log(this.miFormulario)
  }

  guardar(){

    if(this.miFormulario.invalid){
      console.log(this.miFormulario)
      return 
    }

    console.log(this.miFormulario.value)
    this.heroe=this.miFormulario.value

    this.heroesService.crearHeroe(this.heroe)
    .subscribe(resp=>{
      console.log(resp)
    })
    

  }

}


