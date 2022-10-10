import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  private _isLoggedIn = false;
  constructor(private _router:Router) { }

  get LoggedIn(){
    let token = localStorage.getItem('jwt');
    if(token == undefined)
      return false
    return true;
  }

  // getRole(role: any){
  //   let Token = localStorage.getItem('jwt');
  //   if(Token != null){
  //     let Role = JSON.parse(atob(Token.split('.')[1])).role;

  //     console.log(JSON.parse(atob(Token)));

  //     if(Role == role){
  //       return true;
  //     }
  //   }
  //   this._router.navigate(['Forbidden'])
  //   return false;
  // }

  getName(role: any){
    let Token = localStorage.getItem('jwt');
    if(Token != null){
      let Name = JSON.parse(atob(Token.split('.')[1])).name;

      return Name;
      
    }
    return null;
  }
}
