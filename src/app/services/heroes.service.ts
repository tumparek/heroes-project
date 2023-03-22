import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map,delay } from 'rxjs';

import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url= 'https://heroes-5ad10-default-rtdb.europe-west1.firebasedatabase.app/heroes/'

  constructor(private http:HttpClient) { }

  crearHeroe( heroe:any){

    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map((resp:any)=>{
        heroe.id= resp.name;
        return heroe;
      })
    )

  }

  actualizarHeroe(heroe:any){

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${ heroe.id }.json`, heroe);



  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json` )
    .pipe(
      map(
        this.crearArreglo

      ),
      delay(1500)
    )
  }
  private crearArreglo( heroesObj: any){

    const heroes:HeroeModel[]=[];

    if (heroesObj ===null ){
      return [];
    }
    
   
    Object.keys( heroesObj ).forEach( key =>{
    const heroe : HeroeModel = heroesObj[key];
    heroe.id= key ;

    heroes.push( heroe )

    })
    return heroes
  }
  borrarHeroe(id:any){

    return this.http.delete(`${this.url}/heroes/${ id }.json`);

  }
  getHeroe(id:any){

    return this.http.get(`${this.url}/heroes/${ id }.json`);

  }

}

