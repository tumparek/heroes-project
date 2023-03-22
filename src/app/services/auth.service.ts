import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

import { createUserWithEmailAndPassword } from "firebase/auth";

import { map } from 'rxjs/operators';

import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: any;
  

  get user(){
    return this._user;
    
  }

  constructor( public auth: Auth,
    private firestore:Firestore ) { }





    initAuthListener(){
      {
        this.auth.beforeAuthStateChanged((fuser:any) => {
      
          console.log(fuser);
      
          if(fuser){
            const user = Usuario.fromFirebase(fuser);
            this._user = user
          
            
          }else{
            this._user = null;
        
          }
          console.log(this._user);
        
      
        
       
      })
      }
    }

    crearusUario(nombre:string, email:string, password:string){

      return createUserWithEmailAndPassword(this.auth,email,password)
      .then(({user})=>{
        const newUser = new Usuario( user.uid, nombre, email);
        const userRef= collection(this.firestore,user.uid)
        return addDoc(userRef,{...newUser})
            
      })
    
            
      }

      loginUsuario(email:string, password:string){
        return signInWithEmailAndPassword(this.auth,email,password);
    
      }
      
      
      
      logOut(){
        return this.auth.signOut();
      }
      
      isAuth() {
        return authState(this.auth).pipe(
          map((firebaseUser) => firebaseUser !== null)
        );
      }
}
