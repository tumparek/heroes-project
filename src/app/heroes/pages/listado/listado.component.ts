import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HeroesService } from '../../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{
  heroes:any
  cargando= false;



  constructor( private heroesService:HeroesService){



  }
  ngOnInit(): void {

    this.cargando = true;

    this.heroesService.getHeroes()
    .subscribe(resp =>{
      console.log(resp);
      this.heroes = resp;
      this.cargando = false;
    })
  }
  borrarHeroe( heroe:any,i:any){

    Swal.fire({
      title:'¿Are you sure?',
      text:`Está seguro que quiere borrar a ${heroe.nombre}`,
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

}

