import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../shared/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = 'https://localhost:44367/User/Login';
  constructor(private http: HttpClient, private _router:Router) { }

  userLogin(login: Login){
    return this.http.post<any>(this.url, login);
  }

  userLogout(){
    localStorage.clear();
  }
}
