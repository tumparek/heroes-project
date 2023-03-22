import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';






@NgModule({
  declarations: [
    AppComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
