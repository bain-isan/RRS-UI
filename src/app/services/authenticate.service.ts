import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private _isLoggedIn = false;
  constructor() { }

  get LoggedIn(){
    let token = localStorage.getItem('jwt');
    if(token == undefined)
      return false
    return true;
  }
}
