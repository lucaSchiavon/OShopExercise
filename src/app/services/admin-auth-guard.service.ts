import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth:AuthService) { }

  canActivate(route){

    if(this.auth.getUser().admin)
    return true;

    return false;

  }
}
