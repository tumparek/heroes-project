import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { NgxPaginationModule } from 'ngx-pagination'
import { HeroesRoutingModule } from './heroes-routing.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';








@NgModule({
  declarations: [
    AgregarComponent,
    HeroeComponent,
    HomeComponent,
    ListadoComponent,
    

    
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class HeroesModule { }
