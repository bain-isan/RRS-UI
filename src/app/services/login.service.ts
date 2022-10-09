import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../shared/login';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url = 'https://localhost:44367/User/Login';
  constructor(private http: HttpClient) { }

  userLogin(login: Login){
    return this.http.post<any>(this.url, login);
  }
}
