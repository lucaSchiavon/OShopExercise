import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //no admin
  //token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6ZmFsc2V9.DLTdOwxPMgCsXA9p2WDJvwimoQvL2Q6Yyn_sm6B4KRE'
  //admin
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
  currentUser:any;

  constructor(private jwtHelper: JwtHelperService , private route:ActivatedRoute) {}

  login(credentials):any
  {
    //memorizzo se l'utente proviene da una pagina diversa da login prima di loggarsi
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    //chiamare la API
    if (credentials.email=="a.a@a.it" && credentials.password=="aaa")
    {
      localStorage.setItem('token', this.token);
      return {status:200, body: {token:this.token}};
    }
    else
    return {status:200};

  }

  logout() { 
    localStorage.removeItem('token');
    localStorage.removeItem('returnUrl');
    this.currentUser = null;
  }

  isLoggedIn() { 
    //return tokenNotExpired('token');
   
   let token= localStorage.getItem("token");
   //console.log("il token" + token);
   if (token)
    return true;
    else
    return false;
  }

  getUser():any
  {
     // console.log(decodedToken); // Stampa le informazioni del token
    const token = localStorage.getItem('token');
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken;
  
  }
}


