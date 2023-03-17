import { Component, OnInit } from '@angular/core';

import { HeroesService } from '../../../services/heroes.service';

import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  heroe:any
  cargando= false;

  creadores=[{
    id:'Marvel'
  },
  {
    id:'DC'
  }]

  miFormulario: FormGroup = this.fb.group({
    
    heroe:['', [Validators.required]],
    nombre:['', Validators.required],
    poder:['', Validators.required],
    creador:['', Validators.required],
    estado:[, Validators.required]
  })

  constructor( private heroesService:HeroesService,
               private fb:FormBuilder,
               private route:ActivatedRoute){
 
  }
  ngOnInit(): void {
    this.cargando = true;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id !== 'nuevo' ){

      this.heroesService.getHeroes()
      .subscribe((resp:any)=>{
        this.heroe = resp;
        this.heroe.id= id ;
        this.cargando = false;
      })

    }


  }

  guardar(){

    if(this.miFormulario.invalid){
      
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


