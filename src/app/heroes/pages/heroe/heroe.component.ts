import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';


import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  cargando=true;
  heroe: HeroeModel = new HeroeModel();

  constructor( private heroesService:HeroesService,
               private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.cargando= true;

    const id = this.route.snapshot.paramMap.get('id');
    
    if (id !== 'nuevo' ){

      this.heroesService.getHeroe(id)
      .subscribe((resp:any)=>{
        this.heroe = resp;
        this.heroe.id= id ;
        this.cargando= false;
      })

    }


  }

  guardar ( form:NgForm ){

    if(form.invalid){

      console.log('Formulario no valido')
      return;
    }

    Swal.fire({
      title:'Espere',
      text:'Guardando info',
     allowOutsideClick:false,
     icon:'info'
     

      
    });

    Swal.showLoading();

    let peticion : Observable<any> ;

    if (this.heroe.id){
      peticion = this.heroesService.actualizarHeroe(this.heroe);
   

    }else {
      peticion= this.heroesService.crearHeroe(this.heroe);
     
    }

    peticion.subscribe(resp=>{

      Swal.fire({
        title: this.heroe.nombre,
        text:'Se actualizó correctamente',
        icon:'success' 
      })

    })

    

   

  }

}


