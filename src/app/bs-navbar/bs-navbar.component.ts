import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

 

  constructor(private authService:AuthService,public route:Router) { 


  }

  ngOnInit(): void {
  }

  logOut(){
    this.authService.logout();
    this.route.navigate(['/login']);
  }
  isLoggedIn():boolean{
  
   return this.authService.isLoggedIn();
  }
 
}
