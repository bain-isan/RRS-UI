import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../shared/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public url = 'https://localhost:44367/User/Register';
  constructor(private http: HttpClient) { }

  userRegister(register: Register){
    return this.http.post<any>(this.url, register);
  }
}
