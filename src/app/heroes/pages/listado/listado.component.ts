import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeroesService } from '../../../services/heroes.service';
import { NgForm } from '@angular/forms';
import { HeroeModel } from 'src/app/models/heroe.model';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{
  
  
  public heroes:HeroeModel[] = [];

  public filterPost=''
  public cargando = false;
  public config:any;
  public collection={ data:[]}
  




  constructor( private heroesService:HeroesService,
               private router:Router){



  }
  ngOnInit(): void {

    this.cargando = true;

    this.heroesService.getHeroes()
    .subscribe(resp =>{
      console.log(resp);
      this.heroes = resp;
      this.cargando = false;
    });

    this.config={
      itemsPerPage:5,
      currentPage:1,
      

    }
  }
  borrarHeroe( heroe:any,i:any){

    Swal.fire({
      title:'¿Are you sure?',
      text:`Está seguro que quiere borrar a ${heroe.heroe}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton:true

    }).then(resp=>{

      if(resp.value){
        this.heroes.splice(i,1);

        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    })

   

  }

 
  





  buscarHeroe( termino:string ){

   if(termino.length <= 0){
    this.ngOnInit()
    console.log(this.cargando)
    
    console.log(this.heroes)
    return this.heroes;
  
      
     
     
    }

    console.log(termino)
    let heroeArr: HeroeModel[] = [];
    termino = termino.toLocaleLowerCase();
    for( let heroe of this.heroes ){

    let nombre = heroe.heroe.toLowerCase();
      console.log(nombre)
      if( nombre.includes(termino) ){
        heroeArr.push( heroe );
        this.heroes=heroeArr;
        
      }

    }

console.log(heroeArr)


    return heroeArr;
  

  

    //this.router.navigate(['/heroes/buscar',texto ]);

    


  }

  pageChange(event:any){

    this.config.currentPage = event

  }


}



