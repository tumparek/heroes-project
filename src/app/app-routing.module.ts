import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'auth', loadChildren:()=> import ('./auth/auth.module').then (m=>m.AuthModule)
  },
  {
    path:'heroes', loadChildren:()=> import ('./heroes/heroes.module').then (m=>m.HeroesModule) , canActivate: [AuthGuard]
  },
  {
    path:'**', redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
