import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  today= new Date();
  


  constructor ( private authService:AuthService,
                private router:Router){
    
  }


 logOut(){
    this.authService.logOut().then(()=>{

      this.router.navigate(['/auth/login'])
    })

  }


}
