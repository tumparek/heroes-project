import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HeroesService } from '../../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{
  heroes:any;
  cargando= false;
  config:any;
  collection={count:60, data:[]}



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
  buscarHeroe( texto:string ){

    texto=texto.trim();

    if( texto.length === 0){
    return

    }

    this.router.navigate(['/heroes/buscar',texto ]);

    console.log(texto)


  }

  pageChange(event:any){

    this.config.currentPage = event

  }

}



