import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidUser: boolean; 
  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

 signIn(credentials){
  //console.log(credentials);
  let risposta= this.authService.login(credentials);
  //console.log(risposta.body.token);
  if (risposta.body!==undefined){
    this.invalidUser=false;

    let returnUrl=localStorage.getItem('returnUrl');
    
    //this.router.navigate(['/']);
    //this.router.navigateByUrl('/');
    this.router.navigate([returnUrl]);
    //this.router.navigate(['/check-out']);

  }
  else{
    this.invalidUser=true;
  }
  
 }
}
