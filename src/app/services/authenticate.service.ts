import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private _isPrint = false;
  constructor(private _router:Router) { }

  get LoggedIn(){
    let token = localStorage.getItem('jwt');
    if(token == undefined)
      return false
    return true;
  }

  getRole(role: any[]){
    let Role = localStorage.getItem('role');
    if(Role != undefined){

      if(role.includes(Role)){
        return true;
      }
    }
    this._router.navigate(['Forbidden'])
    return false;
  }

  getName(){
    let Token = localStorage.getItem('jwt');
    if(Token != null){
      let Name = JSON.parse(atob(Token.split('.')[1])).name;

      return Name;
      
    }
    return null;
  }

  get Role(){
    let role = localStorage.getItem('role');
    return role;
  }
}
